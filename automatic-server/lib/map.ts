import { COUNTRY_NAME, TOWN_AREAS, TOWN_POPULATION, TOWN_SIZE } from "./enums";
import getters from "./getters";

// const townNames = {
//   "134_82": "Greatdenn",
//   "250_62": "Uvle",
//   "286_130": "Colyrdim",
//   "354_182": "Spriglight",
//   "195_238": "Cevonlin",
//   "170_196": "Shadowward",
//   "165_243": "Rislaird Udel",
//   "78_224": "Honeydenn",
//   "654_140": "Geghbaduhr",
//   "877_68": "Khag Boramm",
//   "746_95": "Khig Turuhm",
//   "624_259": "Nerboram",
//   "729_196": "Bhighborim",
//   "854_219": "Moghgarohm",
//   "919_203": "Thug Maldur",
//   "638_366": "Dilolur",
//   "539_621": "Nangstaden",
//   "611_548": "Velocibarrow",
//   "643_500": "Thunderhold",
//   "680_410": "Gogglestorm",
//   "803_324": "Gearingward",
//   "769_394": "Blockerned",
//   "855_411": "Rullak Fra",
//   "962_445": "Bip Pintheft",
//   "856_504": "Dikni Gir",
//   "719_491": "Nobbleport",
//   "798_570": "Millingdenn",
//   "693_606": "Schirback",
//   "639_675": "Inathqua",
//   "807_628": "Omal Ortheiad",
//   "763_669": "San Thalor",
//   "522_396": "Baris",
//   "505_505": "Alennoit",
//   "400_432": "Casart",
//   "294_525": "Nanrac",
//   "366_519": "Champitou",
//   "432_562": "Camveil",
//   "105_256": "Highdale",
//   "101_313": "Dewgulch",
//   "156_392": "Pearlburgh",
//   "213_429": "Ironhill",
//   "279_393": "Wildeshield",
//   "222_297": "Caveport",
//   "312_317": "Rockfield",
//   "390_290": "Mythbreak",
//   "521_259": "Tradeland",
//   "413_174": "Fearhand",
//   "565_118": "Roguemeadow",
//   "622_143": "Hazelshield",
//   "555_175": "Midwatch",
//   "104_424": "Ayenmelle",
//   "133_450": "Lanakadi",
//   "193_485": "Inlelone",
//   "136_533": "Osyan Elunore",
//   "204_580": "Asyhnor",
//   "188_667": "Eymasera",
//   "294_566": "Nysrion",
//   "284_609": "Ullranserin",
//   "297_683": "Malona",
//   "398_648": "Raena Themar",
// };

// const ids = {
//   "134_82": "6aa7b5fb-9719-4592-90de-e99d475c863a",
//   "250_62": "60ada9c2-7f13-4e24-b6cc-4f3817dae147",
//   "286_130": "a21bb78b-e3ed-45da-b037-c048c2cf31b9",
//   "354_182": "166111a8-3330-40db-a392-f1ebc6b908e3",
//   "195_238": "5e9b0945-938d-48ae-895d-c8b65eb1e473",
//   "170_196": "d6835ed1-4c35-45c4-a8d0-68b782b5979b",
//   "165_243": "144afbc6-59cd-42d9-b09a-7d37050da9da",
//   "78_224": "1d49608d-1ff9-4b34-8338-019e271f28e6",
//   "654_140": "0329f9e9-6aa9-45e6-8cfe-a994176eb975",
//   "877_68": "b05ba4c5-5e49-4c8a-ae9a-81fef46199b7",
//   "746_95": "5915a010-60cf-491c-866e-0898afb3c8ce",
//   "624_259": "e284bcd8-fdab-4ca8-880e-e562d5faf7b4",
//   "729_196": "88ee57d9-2fd8-4c50-b890-288fef3e0b71",
//   "854_219": "e1830a50-ba4c-43c7-a190-c0c03adde1b1",
//   "919_203": "790b63ee-39cb-4b18-89c1-98f75252f5b6",
//   "638_366": "1708c999-4122-48af-ba91-57d335629609",
//   "539_621": "126e6e1d-4b3b-453b-a239-8648d7383e6f",
//   "611_548": "498af524-ab61-4d28-a03a-f7a202db1e07",
//   "643_500": "18b7f6e3-2f9b-4549-ad62-628728afc6e8",
//   "680_410": "0e518840-c42f-468a-8105-d6e4f2ec9510",
//   "803_324": "9da20a4c-df6c-4073-8b8b-509ce96b3b6c",
//   "769_394": "99f67ac8-258e-47d1-8c97-1abd4e5b7cec",
//   "855_411": "c82499c9-0dbe-4ee8-9656-7c8d8d7fbb8d",
//   "962_445": "5b7ed65e-55bb-4abe-ae1d-72c779d4cf73",
//   "856_504": "49729ad4-c092-441b-95a2-9ac81cf16750",
//   "719_491": "96c667ed-3bd7-413f-88cf-26cb6b64a7d9",
//   "798_570": "89b20a82-c943-4807-acf5-2bf040e10097",
//   "693_606": "95270efe-e94e-433c-a3a8-a34c93539d18",
//   "639_675": "a211c14d-f84e-4383-9c72-7e5ec78f6113",
//   "807_628": "37d8095c-4a1e-4759-92ed-854a232dcb78",
//   "763_669": "c04ac57a-f8b4-4559-ba8c-33054f0c305e",
//   "522_396": "96cb6a39-3efe-4756-bf94-e7ee427dc3a4",
//   "505_505": "30f062d8-14fa-4c0a-8af9-9f41f2b590bf",
//   "400_432": "9d751132-cee7-4e1a-ae2a-77c1f03fcbc0",
//   "294_525": "853cd693-43e6-43e8-8675-aba9a2c0277c",
//   "366_519": "727d461a-4085-47a1-9110-2fd283ec47fa",
//   "432_562": "8603307e-9a28-47ce-90e9-9840ce88fb4f",
//   "105_256": "fb6a9d0f-be48-4934-8417-36151bedc04a",
//   "101_313": "e0e63770-8502-4342-8a39-ace84111baf7",
//   "156_392": "c578a39e-614c-46f1-901a-4839eeedea02",
//   "213_429": "3fcf41bb-7afb-4446-9fd9-9a1687e56536",
//   "279_393": "d5c67a29-a946-4ce6-a666-cfb1e548e669",
//   "222_297": "35242a83-e2d3-4c3c-b764-fbeaab03e576",
//   "312_317": "f8bd6a9a-a71a-491b-86af-aa73ec085d5b",
//   "390_290": "0fa52397-4b96-4c64-b6a6-1e7e71c4c91b",
//   "521_259": "d0962cb6-0616-457a-bb1e-85ad98ba3110",
//   "413_174": "bc420835-5ba1-4997-a153-fd3f4f1a2568",
//   "565_118": "c0a1d0b5-7114-493c-9a5f-643c3966947f",
//   "622_143": "811cd220-ab81-44ae-84c4-29fabecbcf6e",
//   "555_175": "43a722d8-b29b-4de1-ba3f-9603389501f8",
//   "104_424": "82ab4775-03f9-49c2-a989-f6cd81f0275c",
//   "133_450": "ad6905e0-4f74-4b28-bb77-c39f51544031",
//   "193_485": "b20c4624-c262-4005-9268-e5c74e42a7f4",
//   "136_533": "e0741476-c131-42f9-89ac-1c66ed2701bc",
//   "204_580": "11642c15-ab70-4b75-860e-e9aafc11575d",
//   "188_667": "51d0e61b-3f2e-4c4a-93a4-4dc0c202c02c",
//   "294_566": "b699be97-2c94-4f46-b488-633ed8c5e160",
//   "284_609": "fd403b2c-00a4-4c1a-b47e-b1fdb08180aa",
//   "297_683": "cfac612e-e935-421e-bb59-3e2897f5869d",
//   "398_648": "a19f4e66-42fa-4c31-8beb-dff965d5634b",
// };

// const towns = [
//   {
//     location: [275, 168],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.SCULL,
//   },
//   {
//     location: [512, 126],
//     area: areas.MOUNTAINS,
//     size: size.MEDIUM,
//     country: country.SCULL,
//   },
//   {
//     location: [585, 267],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.SCULL,
//   },
//   {
//     location: [726, 372],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.SCULL,
//   },
//   {
//     location: [399, 488],
//     area: areas.SEASIDE,
//     size: size.TOWER,
//     country: country.SCULL,
//   },
//   {
//     location: [348, 401],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.SCULL,
//   },
//   {
//     location: [338, 497],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.SCULL,
//   },
//   {
//     location: [159, 459],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.SCULL,
//   },

//   {
//     location: [1340, 287],
//     area: areas.MOUNTAINS,
//     size: size.BIG,
//     country: country.MAIN_RIGHT_TOP,
//   },
//   {
//     location: [1797, 140],
//     area: areas.MOUNTAINS,
//     size: size.TOWER,
//     country: country.MAIN_RIGHT_TOP,
//   },
//   {
//     location: [1527, 194],
//     area: areas.MOUNTAINS,
//     size: size.TOWER,
//     country: country.MAIN_RIGHT_TOP,
//   },
//   {
//     location: [1277, 531],
//     area: areas.MOUNTAINS,
//     size: size.TOWER,
//     country: country.MAIN_RIGHT_TOP,
//   },
//   {
//     location: [1493, 401],
//     area: areas.FIELD,
//     size: size.MEDIUM,
//     country: country.MAIN_RIGHT_TOP,
//   },
//   {
//     location: [1748, 449],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.MAIN_RIGHT_TOP,
//   },
//   {
//     location: [1883, 416],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.MAIN_RIGHT_TOP,
//   },
//   {
//     location: [1307, 750],
//     area: areas.LAKE,
//     size: size.BIG,
//     country: country.MAIN_RIGHT_TOP,
//   },

//   {
//     location: [1104, 1272],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1251, 1122],
//     area: areas.LAKE,
//     size: size.SMALL,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1317, 1023],
//     area: areas.LAKE,
//     size: size.MEDIUM,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1392, 839],
//     area: areas.LAKE,
//     size: size.SMALL,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1644, 663],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1574, 806],
//     area: areas.FIELD,
//     size: size.MEDIUM,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1752, 842],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1970, 912],
//     area: areas.SEASIDE,
//     size: size.TOWER,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1754, 1032],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1472, 1005],
//     area: areas.FIELD,
//     size: size.SMALL,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1635, 1167],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },
//   {
//     location: [1419, 1242],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.MAIN_RIGHT_BOTTOM,
//   },

//   {
//     location: [1308, 1382],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.ISLANDS_RIGHT,
//   },
//   {
//     location: [1652, 1287],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.ISLANDS_RIGHT,
//   },
//   {
//     location: [1562, 1370],
//     area: areas.FIELD,
//     size: size.BIG,
//     country: country.ISLANDS_RIGHT,
//   },

//   {
//     location: [1070, 810],
//     area: areas.FIELD,
//     size: size.SMALL,
//     country: country.MAIN_MIDDLE,
//   },
//   {
//     location: [1034, 1034],
//     area: areas.FIELD,
//     size: size.SMALL,
//     country: country.MAIN_MIDDLE,
//   },
//   {
//     location: [819, 884],
//     area: areas.FIELD,
//     size: size.SMALL,
//     country: country.MAIN_MIDDLE,
//   },
//   {
//     location: [602, 1076],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.MAIN_MIDDLE,
//   },
//   {
//     location: [749, 1062],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.MAIN_MIDDLE,
//   },
//   {
//     location: [885, 1151],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.MAIN_MIDDLE,
//   },

//   {
//     location: [216, 525],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [206, 642],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [320, 803],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [437, 878],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [572, 804],
//     area: areas.FIELD,
//     size: size.BIG,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [455, 608],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [638, 650],
//     area: areas.FIELD,
//     size: size.SMALL,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [798, 593],
//     area: areas.FIELD,
//     size: size.MEDIUM,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [1068, 531],
//     area: areas.MOUNTAINS,
//     size: size.TOWER,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [845, 356],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [1158, 242],
//     area: areas.LAKE,
//     size: size.SMALL,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [1274, 293],
//     area: areas.LAKE,
//     size: size.MEDIUM,
//     country: country.MAIN_LEFT,
//   },
//   {
//     location: [1136, 359],
//     area: areas.LAKE,
//     size: size.MEDIUM,
//     country: country.MAIN_LEFT,
//   },

//   {
//     location: [212, 869],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.ISLANDS_LEFT,
//   },
//   {
//     location: [273, 921],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.ISLANDS_LEFT,
//   },
//   {
//     location: [396, 993],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.ISLANDS_LEFT,
//   },
//   {
//     location: [279, 1092],
//     area: areas.SEASIDE,
//     size: size.BIG,
//     country: country.ISLANDS_LEFT,
//   },
//   {
//     location: [417, 1188],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.ISLANDS_LEFT,
//   },
//   {
//     location: [386, 1365],
//     area: areas.SEASIDE,
//     size: size.TOWER,
//     country: country.ISLANDS_LEFT,
//   },
//   {
//     location: [603, 1160],
//     area: areas.SEASIDE,
//     size: size.TOWER,
//     country: country.ISLANDS_LEFT,
//   },
//   {
//     location: [582, 1248],
//     area: areas.SEASIDE,
//     size: size.SMALL,
//     country: country.ISLANDS_LEFT,
//   },
//   {
//     location: [609, 1398],
//     area: areas.SEASIDE,
//     size: size.TOWER,
//     country: country.ISLANDS_LEFT,
//   },
//   {
//     location: [816, 1328],
//     area: areas.SEASIDE,
//     size: size.MEDIUM,
//     country: country.ISLANDS_LEFT,
//   },
// ]
//   .map((t) => ({
//     // I messed up with image size, so need to recalculate towns location
//     ...t,
//     location: [
//       Math.round((t.location[0] / 2048) * 1000),
//       Math.round((t.location[1] / 1536) * 750),
//     ],
//   }))
//   .map((t) => ({
//     ...t,
//     id: ids[`${t.location[0]}_${t.location[1]}`],
//     name: townNames[`${t.location[0]}_${t.location[1]}`],
//   }));

const holes = [
  [327, 375],
  [307, 450],
];

const getNewDestination = async (oldLocation: [number, number]) => {
  const _towns = await getters.getTowns();
  const newTowns = _towns.filter(
    ({ location }) =>
      !(oldLocation[0] === location[0] && oldLocation[1] === location[1])
  );

  return newTowns[Math.floor(Math.random() * newTowns.length)];
};

const getMapData = async () => {
  const _getTowns = getters.getTowns;

  return {
    towns: await _getTowns().then((ts) =>
      ts.map((t) => {
        const population = Math.round(t.population);

        const _size: TOWN_SIZE = t.is_tower
          ? TOWN_SIZE.TOWER
          : TOWN_SIZE[
              Object.entries(TOWN_POPULATION)
                .filter(
                  (d) =>
                    population >= (d[1][0] as number) &&
                    population < (d[1][1] as number)
                )
                .map(([s]) => s)[0] as TOWN_SIZE
            ];
        return { ...t, size: _size, population };
      })
    ),
    holes,
    areas: TOWN_AREAS,
    countryName: COUNTRY_NAME,
  };
};

export default {
  holes,
  getMapData,
  getNewDestination,
};
