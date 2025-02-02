import { ConsumerProfile, CourierProfile, Flavor, UserProfile, WithId } from '@appjusto/types';
import Constants from 'expo-constants';
import firebase from 'firebase';
import * as geofirestore from 'geofirestore';
import * as Sentry from 'sentry-expo';
import AuthApi from './auth';
import { documentAs } from './types';

export default class ProfileApi {
  private firestoreWithGeo: geofirestore.GeoFirestore;
  private collectionName: string;
  constructor(
    private firestore: firebase.firestore.Firestore,
    private auth: AuthApi,
    public flavor: Flavor
  ) {
    this.firestoreWithGeo = geofirestore.initializeApp(this.firestore);
    this.collectionName = this.flavor === 'consumer' ? 'consumers' : 'couriers';
  }

  // private helpers
  private getProfileRef(id: string) {
    return this.firestore.collection(this.collectionName).doc(id);
  }
  private async createProfile(id: string) {
    console.log(`Creating ${this.flavor} profile...`);
    await this.getProfileRef(id).set({
      situation: 'pending',
      email: this.auth.getEmail(),
      createdOn: firebase.firestore.FieldValue.serverTimestamp(),
    } as UserProfile);
  }

  // firestore
  // observe profile changes
  observeProfile(
    id: string,
    resultHandler: (profile: WithId<UserProfile>) => void
  ): firebase.Unsubscribe {
    const unsubscribe = this.getProfileRef(id).onSnapshot(
      async (snapshot) => {
        // ensure profile exists
        if (!snapshot.exists) {
          const unsub = this.getProfileRef(id).onSnapshot(
            { includeMetadataChanges: true },
            (snapshotWithMetadata) => {
              if (!snapshotWithMetadata.metadata.hasPendingWrites) {
                resultHandler(documentAs<UserProfile>(snapshotWithMetadata));
                unsub();
              }
            }
          );
          await this.createProfile(id);
        } else resultHandler(documentAs<UserProfile>(snapshot));
      },
      (error) => {
        console.log(error);
        Sentry.Native.captureException(error);
      }
    );
    // returns the unsubscribe function
    return unsubscribe;
  }

  // update profile
  updateProfile(id: string, changes: Partial<CourierProfile> | Partial<ConsumerProfile>) {
    console.log('updating profile...');
    const appVersion = `${Constants.nativeAppVersion}${
      Constants.manifest ? ` / ${Constants.manifest.version}` : ''
    }`;
    return this.getProfileRef(id).set(
      {
        ...changes,
        appVersion,
        updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
      } as UserProfile,
      { merge: true }
    );
  }

  updateLocation(id: string, location: firebase.firestore.GeoPoint) {
    console.log('updating location...');
    return this.firestoreWithGeo
      .collection(this.collectionName)
      .doc(id)
      .update({
        coordinates: location,
        updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
      } as UserProfile);
  }
}
