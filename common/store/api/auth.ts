import { DeleteAccountPayload } from '@appjusto/types';
import Constants from 'expo-constants';
import firebase from 'firebase';
import { domains } from '../../../app.config';
// import * as Sentry from 'sentry-expo';
import { Environment, Extra } from '../../../config/types';
import FirebaseRefs from './FirebaseRefs';

export default class AuthApi {
  constructor(private refs: FirebaseRefs, private auth: firebase.auth.Auth, private extra: Extra) {}

  observeAuthState(handler: (a: firebase.User | null) => any): firebase.Unsubscribe {
    return this.auth.onAuthStateChanged(handler);
  }

  async sendSignInLinkToEmail(email: string, environment: Environment): Promise<void> {
    this.auth.languageCode = 'pt'; // i18n
    try {
      await this.refs.getPlatformLoginLogsRef().add({
        email,
        flavor: this.extra.flavor,
        signInAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      // Sentry.Native.captureException(error);
    }
    const url = `https://${domains.fallback}/${this.extra.flavor}/join`;
    return this.auth.sendSignInLinkToEmail(email, {
      url,
      handleCodeInApp: true,
      iOS: {
        bundleId: this.extra.bundleIdentifier,
      },
      android: {
        packageName: this.extra.androidPackage,
        installApp: false,
      },
      dynamicLinkDomain: `${domains.deeplink}`,
    });
  }

  isSignInWithEmailLink(link: string | null): boolean {
    if (!link) return false;
    return this.auth.isSignInWithEmailLink(link);
  }

  async signInWithEmailLink(email: string, link: string) {
    const userCredential = await this.auth.signInWithEmailLink(email, link);
    return userCredential.user;
  }

  getUserId() {
    return this.auth.currentUser?.uid;
  }

  getEmail() {
    return this.auth.currentUser?.email;
  }

  signOut() {
    return this.auth.signOut();
  }

  deleteAccount(payload: Partial<DeleteAccountPayload>) {
    return this.refs.getDeleteAccountCallable()({
      ...payload,
      meta: { version: Constants.nativeBuildVersion },
    });
  }
}
