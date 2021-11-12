import { BusinessAlgolia, LatLng } from '@appjusto/types';
import { distanceBetweenLatLng } from '../../../../../common/store/api/helpers';
import { t } from '../../../../../strings';
import { RestaurantListSection } from './types';


type Props = {
  items: BusinessAlgolia[];
  currentLocation?: LatLng;
};

export const sectionsFromResults = ({ items, currentLocation }: Props) => {
  //const location: LatLng = { latitude: 0, longitude: 0 };//temporary hardcoded for test
  const openInRange = (items ?? []).filter((restaurant) => restaurant.status === 'open'
    && (restaurant.deliveryRange ?? 0) < (currentLocation && restaurant.businessAddress?.latlng ? distanceBetweenLatLng(currentLocation, restaurant.businessAddress.latlng) : 0));
  const openOutOfRange = (items ?? []).filter((restaurant) => restaurant.status === 'open'
    && (restaurant.deliveryRange ?? 0) >= (currentLocation && restaurant.businessAddress?.latlng ? distanceBetweenLatLng(currentLocation, (restaurant.businessAddress.latlng)) : 0));
  //gets restaurants ordered by distance, and grouped by in/out of delivery range
  //const open = (items ?? []).filter((restaurant) => restaurant.status === 'open')
  const open = openInRange.concat(openOutOfRange);
  const closed = (items ?? []).filter((restaurant) => restaurant.status === 'closed');
  let sections: RestaurantListSection[] = [];
  if (open.length > 0) {
    sections = [
      {
        title: t('Restaurantes abertos agora'),
        subtitle: t('Valor justo para restaurantes e entregadores/as'),
        data: open,
      },
    ];
  }
  if (closed.length > 0) {
    sections = [
      ...sections,
      {
        title: t('Fechados no momento'),
        subtitle: t('Fora do horário de funcionamento'),
        data: closed,
      },
    ];
  }
  return sections;
};
