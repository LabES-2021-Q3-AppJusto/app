import { LatLng } from '@appjusto/types';
import * as Location from 'expo-location';
import { requestForegroundPermissionsAsync } from 'expo-location';
import React from 'react';

const shouldAskPermission = (
  response: Location.LocationPermissionResponse | null | undefined
): boolean => {
  if (response === undefined) return false; // during initialization
  if (response === null) return true;
  if (response.granted) return false;
  return response.canAskAgain;
};

export default function (enabled: boolean = true, key?: string) {
  // state
  const [permissionResponse, setPermissionResponse] = React.useState<
    Location.LocationPermissionResponse | null | undefined
  >(undefined);
  const [lastKnownLocation, setLastKnownLocation] = React.useState<Location.LocationObject | null>(
    null
  );
  const coords: LatLng | undefined = React.useMemo(
    () =>
      lastKnownLocation
        ? {
            latitude: lastKnownLocation.coords.latitude,
            longitude: lastKnownLocation.coords.longitude,
          }
        : undefined,
    [lastKnownLocation]
  );

  // side effects
  // key is used to allow restarting the verification process
  React.useEffect(() => {
    setPermissionResponse(null); // start or reset permission check process
  }, [key]);
  // check if we should ask permission or start/stop location updates task
  React.useEffect(() => {
    if (enabled) {
      if (shouldAskPermission(permissionResponse)) {
        (async () => {
          setPermissionResponse(await requestForegroundPermissionsAsync());
        })();
        return;
      }
      if (permissionResponse?.granted) {
        (async () => {
          const last = await Location.getLastKnownPositionAsync();
          if (last) setLastKnownLocation(last);
          const current = await Location.getCurrentPositionAsync();
          setLastKnownLocation(current);
        })();
      }
    }
  }, [enabled, permissionResponse]);

  return { lastKnownLocation, coords, permissionResponse };
}
