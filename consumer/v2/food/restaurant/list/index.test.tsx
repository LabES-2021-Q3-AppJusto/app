import { BusinessAlgolia } from "@appjusto/types";
import firebase from "firebase";
import _ from "lodash";
import { t } from '../../../../../strings';
import { sectionsFromResults } from "./index";
import { RestaurantListSection } from "./types";

const currentLocation = { latitude: 0, longitude: 0 }

//BusinessAlgolia type variable for creating restaurants used in tests
var restaurant: BusinessAlgolia =
{
    objectID: "1",
    _geoloc: { lat: 0, lng: 0 },
    enabled: true,
    name: "",
    code: "",
    managerEmail: "",
    situation: "",
    onboarding: "",
    description: "",
    status: "open",
    businessAddress: {
        cep: "",
        address: "",
        number: "",
        additional: "",
        city: "",
        state: "",
        latlng: {
            latitude: currentLocation?.latitude ?? 0, longitude: currentLocation?.longitude ?? 0
        }
    },
    cuisine: "",
    deliveryRange: 1000,
    statistics: {
        totalOrders: 0,
        averagePreparationTime: 0,
        averageTicketPrice: 0,
        averageWaitingTime: 0
    },
    createdOn: firebase.firestore.FieldValue.serverTimestamp()
};

//proper order of how restaurants should appear
var orderedRestaurantsTest: BusinessAlgolia[];

orderedRestaurantsTest = [_.cloneDeep(restaurant),
_.cloneDeep(restaurant),
_.cloneDeep(restaurant),
_.cloneDeep(restaurant)
];

//restaurant 0 is open, in range
orderedRestaurantsTest[0].deliveryRange = 1000000;
orderedRestaurantsTest[0].businessAddress.latlng = { latitude: 6, longitude: 6 };
//restaurant 1 is open, out of range, closer than restaurant 0
orderedRestaurantsTest[1].businessAddress.latlng = { latitude: 5, longitude: 5 };
//restaurant 2 is closed, in range
orderedRestaurantsTest[2].businessAddress.latlng = { latitude: 6, longitude: 6 };
orderedRestaurantsTest[2].deliveryRange = 1000000;
orderedRestaurantsTest[2].status = "closed";
//restaurant 3 is closed, out of range, closer than restaurant 2
orderedRestaurantsTest[3].businessAddress.latlng = { latitude: 5, longitude: 5 };
orderedRestaurantsTest[3].status = "closed";

var unorderedRestaurantsTest: BusinessAlgolia[];
unorderedRestaurantsTest = [_.cloneDeep(orderedRestaurantsTest[3]),
_.cloneDeep(orderedRestaurantsTest[2]),
_.cloneDeep(orderedRestaurantsTest[1]),
_.cloneDeep(orderedRestaurantsTest[0])];

//creating sections as in the function to be tested
let sectionsOrdered: RestaurantListSection[] = [];

const open = [orderedRestaurantsTest[0], orderedRestaurantsTest[1]];
const closed = [orderedRestaurantsTest[2], orderedRestaurantsTest[3]];

sectionsOrdered = [
    {
        title: t('Restaurantes abertos agora'),
        subtitle: t('Valor justo para restaurantes e entregadores/as'),
        data: open,
    },
];
sectionsOrdered = [
    ...sectionsOrdered,
    {
        title: t('Fechados no momento'),
        subtitle: t('Fora do horário de funcionamento'),
        data: closed,
    },
];

//tests
describe("RestaurantsInRange", () => {
    it("Should accept no restaurants", () => {
        const sections = sectionsFromResults([], currentLocation);
        expect(sections).toEqual([]);
    });
    it("Should accept undefined currentLocation", () => {
        const sections = sectionsFromResults(orderedRestaurantsTest, undefined);
        expect(sections).toEqual(sectionsOrdered);
    });
    it("Should accept BusinessAlgolia[] and LatLng and return a RestaurantListSection", () => {
        const sections = sectionsFromResults(orderedRestaurantsTest, currentLocation);
        expect(sections).toEqual(sectionsOrdered);
    });
    it("RestaurantListSection should be ordered", () => {
        const sections = sectionsFromResults(unorderedRestaurantsTest, currentLocation);
        expect(sections).toEqual(sectionsOrdered);
    });
});