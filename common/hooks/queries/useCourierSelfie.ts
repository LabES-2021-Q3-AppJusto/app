import { useContext } from 'react';
import { useQuery } from 'react-query';

import { ApiContext } from '../../app/context';

export default function (id?: string) {
  const api = useContext(ApiContext);
  const fetchSelfie = (key: string, courierId: string) => {
    if (courierId) return api.courier().fetchSelfie(courierId);
    return Promise.resolve(null);
  };
  return useQuery(['courier-selfie', id], fetchSelfie);
}
