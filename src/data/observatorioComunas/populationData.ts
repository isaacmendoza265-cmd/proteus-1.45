import { YearPopulation, AgeGroupDistribution, PopulationRecord, DemographicCohort, DemographicIndicators } from './types';

export const POPULATION_BY_YEAR: Record<number, Record<number, YearPopulation>> = {
  1: {
    2018: { hombres: 66025, mujeres: 70961, total: 136986 },
    2019: { hombres: 67522, mujeres: 72353, total: 139875 },
    2020: { hombres: 68365, mujeres: 73223, total: 141588 },
    2021: { hombres: 69056, mujeres: 73909, total: 142965 },
    2022: { hombres: 69555, mujeres: 74446, total: 144001 },
    2023: { hombres: 70032, mujeres: 74934, total: 144966 },
    2024: { hombres: 70434, mujeres: 75374, total: 145808 },
    2025: { hombres: 70755, mujeres: 75719, total: 146474 },
    2026: { hombres: 71013, mujeres: 75998, total: 147011 },
    2027: { hombres: 71229, mujeres: 76229, total: 147458 },
    2028: { hombres: 71426, mujeres: 76435, total: 147861 },
    2029: { hombres: 71602, mujeres: 76595, total: 148197 },
    2030: { hombres: 71769, mujeres: 76738, total: 148507 }
  },
  2: {
    2018: { hombres: 53856, mujeres: 59208, total: 113064 },
    2019: { hombres: 55132, mujeres: 60378, total: 115510 },
    2020: { hombres: 55869, mujeres: 61103, total: 116972 },
    2021: { hombres: 56482, mujeres: 61682, total: 118164 },
    2022: { hombres: 56940, mujeres: 62116, total: 119056 },
    2023: { hombres: 57379, mujeres: 62527, total: 119906 },
    2024: { hombres: 57759, mujeres: 62894, total: 120653 },
    2025: { hombres: 58071, mujeres: 63194, total: 121265 },
    2026: { hombres: 58334, mujeres: 63435, total: 121769 },
    2027: { hombres: 58570, mujeres: 63629, total: 122199 },
    2028: { hombres: 58775, mujeres: 63806, total: 122581 },
    2029: { hombres: 58974, mujeres: 63955, total: 122929 },
    2030: { hombres: 59157, mujeres: 64092, total: 123249 }
  },
  3: {
    2018: { hombres: 78762, mujeres: 86096, total: 164858 },
    2019: { hombres: 80612, mujeres: 87924, total: 168536 },
    2020: { hombres: 81692, mujeres: 89124, total: 170816 },
    2021: { hombres: 82580, mujeres: 90099, total: 172679 },
    2022: { hombres: 83239, mujeres: 90877, total: 174116 },
    2023: { hombres: 83887, mujeres: 91622, total: 175509 },
    2024: { hombres: 84452, mujeres: 92296, total: 176748 },
    2025: { hombres: 84914, mujeres: 92875, total: 177789 },
    2026: { hombres: 85309, mujeres: 93374, total: 178683 },
    2027: { hombres: 85657, mujeres: 93811, total: 179468 },
    2028: { hombres: 85978, mujeres: 94207, total: 180185 },
    2029: { hombres: 86283, mujeres: 94576, total: 180859 },
    2030: { hombres: 86566, mujeres: 94914, total: 181480 }
  },
  4: {
    2018: { hombres: 66960, mujeres: 74352, total: 141312 },
    2019: { hombres: 68599, mujeres: 76035, total: 144634 },
    2020: { hombres: 69578, mujeres: 77168, total: 146746 },
    2021: { hombres: 70379, mujeres: 78104, total: 148483 },
    2022: { hombres: 70995, mujeres: 78868, total: 149863 },
    2023: { hombres: 71599, mujeres: 79608, total: 151207 },
    2024: { hombres: 72136, mujeres: 80313, total: 152449 },
    2025: { hombres: 72592, mujeres: 80927, total: 153519 },
    2026: { hombres: 72987, mujeres: 81462, total: 154449 },
    2027: { hombres: 73351, mujeres: 81958, total: 155309 },
    2028: { hombres: 73681, mujeres: 82418, total: 156099 },
    2029: { hombres: 74001, mujeres: 82855, total: 156856 },
    2030: { hombres: 74323, mujeres: 83275, total: 157598 }
  },
  5: {
    2018: { hombres: 58202, mujeres: 65790, total: 123992 },
    2019: { hombres: 59667, mujeres: 67330, total: 126997 },
    2020: { hombres: 60574, mujeres: 68405, total: 128979 },
    2021: { hombres: 61323, mujeres: 69300, total: 130623 },
    2022: { hombres: 61913, mujeres: 70054, total: 131967 },
    2023: { hombres: 62507, mujeres: 70795, total: 133302 },
    2024: { hombres: 63045, mujeres: 71506, total: 134551 },
    2025: { hombres: 63518, mujeres: 72146, total: 135664 },
    2026: { hombres: 63949, mujeres: 72721, total: 136670 },
    2027: { hombres: 64348, mujeres: 73268, total: 137616 },
    2028: { hombres: 64730, mujeres: 73785, total: 138515 },
    2029: { hombres: 65111, mujeres: 74281, total: 139392 },
    2030: { hombres: 65490, mujeres: 74765, total: 140255 }
  },
  6: {
    2018: { hombres: 83470, mujeres: 93720, total: 177190 },
    2019: { hombres: 85552, mujeres: 95754, total: 181306 },
    2020: { hombres: 86842, mujeres: 97114, total: 183956 },
    2021: { hombres: 87909, mujeres: 98228, total: 186137 },
    2022: { hombres: 88750, mujeres: 99133, total: 187883 },
    2023: { hombres: 89589, mujeres: 100002, total: 189591 },
    2024: { hombres: 90330, mujeres: 100809, total: 191139 },
    2025: { hombres: 90975, mujeres: 101508, total: 192483 },
    2026: { hombres: 91557, mujeres: 102119, total: 193676 },
    2027: { hombres: 92083, mujeres: 102664, total: 194747 },
    2028: { hombres: 92599, mujeres: 103174, total: 195773 },
    2029: { hombres: 93069, mujeres: 103645, total: 196714 },
    2030: { hombres: 93547, mujeres: 104088, total: 197635 }
  },
  7: {
    2018: { hombres: 89119, mujeres: 100119, total: 189238 },
    2019: { hombres: 91301, mujeres: 102145, total: 193446 },
    2020: { hombres: 92573, mujeres: 103415, total: 195988 },
    2021: { hombres: 93653, mujeres: 104442, total: 198095 },
    2022: { hombres: 94486, mujeres: 105214, total: 199700 },
    2023: { hombres: 95278, mujeres: 105924, total: 201202 },
    2024: { hombres: 95968, mujeres: 106549, total: 202517 },
    2025: { hombres: 96535, mujeres: 107065, total: 203600 },
    2026: { hombres: 97011, mujeres: 107483, total: 204494 },
    2027: { hombres: 97457, mujeres: 107842, total: 205299 },
    2028: { hombres: 97842, mujeres: 108124, total: 205966 },
    2029: { hombres: 98205, mujeres: 108381, total: 206586 },
    2030: { hombres: 98542, mujeres: 108595, total: 207137 }
  },
  8: {
    2018: { hombres: 73454, mujeres: 79762, total: 153216 },
    2019: { hombres: 75139, mujeres: 81325, total: 156464 },
    2020: { hombres: 76110, mujeres: 82305, total: 158415 },
    2021: { hombres: 76903, mujeres: 83080, total: 159983 },
    2022: { hombres: 77481, mujeres: 83659, total: 161140 },
    2023: { hombres: 78045, mujeres: 84197, total: 162242 },
    2024: { hombres: 78521, mujeres: 84684, total: 163205 },
    2025: { hombres: 78898, mujeres: 85080, total: 163978 },
    2026: { hombres: 79202, mujeres: 85380, total: 164582 },
    2027: { hombres: 79461, mujeres: 85641, total: 165102 },
    2028: { hombres: 79687, mujeres: 85860, total: 165547 },
    2029: { hombres: 79889, mujeres: 86054, total: 165943 },
    2030: { hombres: 80078, mujeres: 86221, total: 166299 }
  },
  9: {
    2018: { hombres: 73129, mujeres: 82262, total: 155391 },
    2019: { hombres: 74915, mujeres: 84034, total: 158949 },
    2020: { hombres: 75992, mujeres: 85202, total: 161194 },
    2021: { hombres: 76868, mujeres: 86156, total: 163024 },
    2022: { hombres: 77542, mujeres: 86911, total: 164453 },
    2023: { hombres: 78212, mujeres: 87641, total: 165853 },
    2024: { hombres: 78802, mujeres: 88313, total: 167115 },
    2025: { hombres: 79304, mujeres: 88887, total: 168191 },
    2026: { hombres: 79743, mujeres: 89384, total: 169127 },
    2027: { hombres: 80142, mujeres: 89819, total: 169961 },
    2028: { hombres: 80521, mujeres: 90225, total: 170746 },
    2029: { hombres: 80881, mujeres: 90608, total: 171489 },
    2030: { hombres: 81233, mujeres: 90963, total: 172196 }
  },
  10: {
    2018: { hombres: 36888, mujeres: 39025, total: 75913 },
    2019: { hombres: 37866, mujeres: 39964, total: 77830 },
    2020: { hombres: 38517, mujeres: 40607, total: 79124 },
    2021: { hombres: 39034, mujeres: 41128, total: 80162 },
    2022: { hombres: 39457, mujeres: 41563, total: 81020 },
    2023: { hombres: 39889, mujeres: 42002, total: 81891 },
    2024: { hombres: 40279, mujeres: 42435, total: 82714 },
    2025: { hombres: 40616, mujeres: 42828, total: 83444 },
    2026: { hombres: 40921, mujeres: 43186, total: 84107 },
    2027: { hombres: 41195, mujeres: 43536, total: 84731 },
    2028: { hombres: 41475, mujeres: 43877, total: 85352 },
    2029: { hombres: 41741, mujeres: 44208, total: 85949 },
    2030: { hombres: 42013, mujeres: 44550, total: 86563 }
  },
  11: {
    2018: { hombres: 44141, mujeres: 55763, total: 99904 },
    2019: { hombres: 45480, mujeres: 57373, total: 102853 },
    2020: { hombres: 46415, mujeres: 58579, total: 104994 },
    2021: { hombres: 47162, mujeres: 59583, total: 106745 },
    2022: { hombres: 47780, mujeres: 60466, total: 108246 },
    2023: { hombres: 48436, mujeres: 61385, total: 109821 },
    2024: { hombres: 49077, mujeres: 62291, total: 111368 },
    2025: { hombres: 49683, mujeres: 63159, total: 112842 },
    2026: { hombres: 50263, mujeres: 63990, total: 114253 },
    2027: { hombres: 50835, mujeres: 64797, total: 115632 },
    2028: { hombres: 51407, mujeres: 65601, total: 117008 },
    2029: { hombres: 51976, mujeres: 66394, total: 118370 },
    2030: { hombres: 52556, mujeres: 67186, total: 119742 }
  },
  12: {
    2018: { hombres: 38277, mujeres: 47139, total: 85416 },
    2019: { hombres: 39375, mujeres: 48360, total: 87735 },
    2020: { hombres: 40126, mujeres: 49249, total: 89375 },
    2021: { hombres: 40729, mujeres: 49983, total: 90712 },
    2022: { hombres: 41230, mujeres: 50611, total: 91841 },
    2023: { hombres: 41743, mujeres: 51257, total: 93000 },
    2024: { hombres: 42234, mujeres: 51886, total: 94120 },
    2025: { hombres: 42685, mujeres: 52472, total: 95157 },
    2026: { hombres: 43110, mujeres: 53023, total: 96133 },
    2027: { hombres: 43528, mujeres: 53554, total: 97082 },
    2028: { hombres: 43943, mujeres: 54072, total: 98015 },
    2029: { hombres: 44345, mujeres: 54584, total: 98929 },
    2030: { hombres: 44751, mujeres: 55096, total: 99847 }
  },
  13: {
    2018: { hombres: 73790, mujeres: 83453, total: 157243 },
    2019: { hombres: 75560, mujeres: 85241, total: 160801 },
    2020: { hombres: 76599, mujeres: 86416, total: 163015 },
    2021: { hombres: 77447, mujeres: 87371, total: 164818 },
    2022: { hombres: 78091, mujeres: 88137, total: 166228 },
    2023: { hombres: 78729, mujeres: 88863, total: 167592 },
    2024: { hombres: 79281, mujeres: 89529, total: 168810 },
    2025: { hombres: 79741, mujeres: 90096, total: 169837 },
    2026: { hombres: 80134, mujeres: 90575, total: 170709 },
    2027: { hombres: 80488, mujeres: 90997, total: 171485 },
    2028: { hombres: 80813, mujeres: 91388, total: 172201 },
    2029: { hombres: 81116, mujeres: 91739, total: 172855 },
    2030: { hombres: 81414, mujeres: 92065, total: 173479 }
  },
  14: {
    2018: { hombres: 47121, mujeres: 59684, total: 106805 },
    2019: { hombres: 47987, mujeres: 60358, total: 108345 },
    2020: { hombres: 48702, mujeres: 60898, total: 109600 },
    2021: { hombres: 49233, mujeres: 61246, total: 110479 },
    2022: { hombres: 49746, mujeres: 61597, total: 111343 },
    2023: { hombres: 50278, mujeres: 61979, total: 112257 },
    2024: { hombres: 50663, mujeres: 62187, total: 112850 },
    2025: { hombres: 51121, mujeres: 62473, total: 113594 },
    2026: { hombres: 51519, mujeres: 62704, total: 114223 },
    2027: { hombres: 51857, mujeres: 62873, total: 114730 },
    2028: { hombres: 52140, mujeres: 62987, total: 115127 },
    2029: { hombres: 52326, mujeres: 62946, total: 115272 },
    2030: { hombres: 52447, mujeres: 62820, total: 115267 }
  },
  15: {
    2018: { hombres: 30133, mujeres: 34518, total: 64651 },
    2019: { hombres: 30938, mujeres: 35377, total: 66315 },
    2020: { hombres: 31457, mujeres: 35986, total: 67443 },
    2021: { hombres: 31877, mujeres: 36498, total: 68375 },
    2022: { hombres: 32220, mujeres: 36929, total: 69149 },
    2023: { hombres: 32570, mujeres: 37356, total: 69926 },
    2024: { hombres: 32892, mujeres: 37772, total: 70664 },
    2025: { hombres: 33182, mujeres: 38151, total: 71333 },
    2026: { hombres: 33457, mujeres: 38500, total: 71957 },
    2027: { hombres: 33720, mujeres: 38833, total: 72553 },
    2028: { hombres: 33983, mujeres: 39149, total: 73132 },
    2029: { hombres: 34244, mujeres: 39464, total: 73708 },
    2030: { hombres: 34501, mujeres: 39778, total: 74279 }
  },
  16: {
    2018: { hombres: 92691, mujeres: 110240, total: 202931 },
    2019: { hombres: 95095, mujeres: 112773, total: 207868 },
    2020: { hombres: 96626, mujeres: 114504, total: 211130 },
    2021: { hombres: 97843, mujeres: 115922, total: 213765 },
    2022: { hombres: 98804, mujeres: 117069, total: 215873 },
    2023: { hombres: 99783, mujeres: 118225, total: 218008 },
    2024: { hombres: 100685, mujeres: 119343, total: 220028 },
    2025: { hombres: 101465, mujeres: 120332, total: 221797 },
    2026: { hombres: 102187, mujeres: 121238, total: 223425 },
    2027: { hombres: 102877, mujeres: 122090, total: 224967 },
    2028: { hombres: 103563, mujeres: 122886, total: 226449 },
    2029: { hombres: 104235, mujeres: 123649, total: 227884 },
    2030: { hombres: 104903, mujeres: 124375, total: 229278 }
  },
  50: {
    2018: { hombres: 2791, mujeres: 2683, total: 5474 },
    2019: { hombres: 2861, mujeres: 2736, total: 5597 },
    2020: { hombres: 2909, mujeres: 2761, total: 5670 },
    2021: { hombres: 2949, mujeres: 2784, total: 5733 },
    2022: { hombres: 2979, mujeres: 2803, total: 5782 },
    2023: { hombres: 3016, mujeres: 2822, total: 5838 },
    2024: { hombres: 3042, mujeres: 2838, total: 5880 },
    2025: { hombres: 3075, mujeres: 2849, total: 5924 },
    2026: { hombres: 3093, mujeres: 2854, total: 5947 },
    2027: { hombres: 3123, mujeres: 2865, total: 5988 },
    2028: { hombres: 3143, mujeres: 2873, total: 6016 },
    2029: { hombres: 3166, mujeres: 2879, total: 6045 },
    2030: { hombres: 3191, mujeres: 2877, total: 6068 }
  },
  60: {
    2018: { hombres: 56250, mujeres: 60170, total: 116420 },
    2019: { hombres: 57474, mujeres: 61261, total: 118735 },
    2020: { hombres: 58160, mujeres: 61916, total: 120076 },
    2021: { hombres: 58710, mujeres: 62422, total: 121132 },
    2022: { hombres: 59118, mujeres: 62814, total: 121932 },
    2023: { hombres: 59501, mujeres: 63166, total: 122667 },
    2024: { hombres: 59816, mujeres: 63460, total: 123276 },
    2025: { hombres: 60062, mujeres: 63691, total: 123753 },
    2026: { hombres: 60267, mujeres: 63867, total: 124134 },
    2027: { hombres: 60443, mujeres: 64001, total: 124444 },
    2028: { hombres: 60585, mujeres: 64101, total: 124686 },
    2029: { hombres: 60709, mujeres: 64181, total: 124890 },
    2030: { hombres: 60828, mujeres: 64246, total: 125074 }
  },
  70: {
    2018: { hombres: 18771, mujeres: 20085, total: 38856 },
    2019: { hombres: 19193, mujeres: 20451, total: 39644 },
    2020: { hombres: 19419, mujeres: 20677, total: 40096 },
    2021: { hombres: 19621, mujeres: 20849, total: 40470 },
    2022: { hombres: 19772, mujeres: 20984, total: 40756 },
    2023: { hombres: 19920, mujeres: 21107, total: 41027 },
    2024: { hombres: 20042, mujeres: 21212, total: 41254 },
    2025: { hombres: 20155, mujeres: 21285, total: 41440 },
    2026: { hombres: 20250, mujeres: 21342, total: 41592 },
    2027: { hombres: 20337, mujeres: 21395, total: 41732 },
    2028: { hombres: 20419, mujeres: 21429, total: 41848 },
    2029: { hombres: 20499, mujeres: 21471, total: 41970 },
    2030: { hombres: 20570, mujeres: 21489, total: 42059 }
  },
  80: {
    2018: { hombres: 45169, mujeres: 49632, total: 94801 },
    2019: { hombres: 46234, mujeres: 50549, total: 96783 },
    2020: { hombres: 46868, mujeres: 51125, total: 97993 },
    2021: { hombres: 47392, mujeres: 51579, total: 98971 },
    2022: { hombres: 47804, mujeres: 51915, total: 99719 },
    2023: { hombres: 48199, mujeres: 52227, total: 100426 },
    2024: { hombres: 48546, mujeres: 52502, total: 101048 },
    2025: { hombres: 48842, mujeres: 52721, total: 101563 },
    2026: { hombres: 49107, mujeres: 52876, total: 101983 },
    2027: { hombres: 49329, mujeres: 53009, total: 102338 },
    2028: { hombres: 49547, mujeres: 53114, total: 102661 },
    2029: { hombres: 49745, mujeres: 53200, total: 102945 },
    2030: { hombres: 49940, mujeres: 53269, total: 103209 }
  },
  90: {
    2018: { hombres: 11659, mujeres: 11809, total: 23468 },
    2019: { hombres: 11912, mujeres: 12011, total: 23923 },
    2020: { hombres: 12056, mujeres: 12122, total: 24178 },
    2021: { hombres: 12167, mujeres: 12216, total: 24383 },
    2022: { hombres: 12256, mujeres: 12272, total: 24528 },
    2023: { hombres: 12341, mujeres: 12336, total: 24677 },
    2024: { hombres: 12416, mujeres: 12386, total: 24802 },
    2025: { hombres: 12472, mujeres: 12419, total: 24891 },
    2026: { hombres: 12518, mujeres: 12441, total: 24959 },
    2027: { hombres: 12561, mujeres: 12452, total: 25013 },
    2028: { hombres: 12597, mujeres: 12466, total: 25063 },
    2029: { hombres: 12645, mujeres: 12457, total: 25102 },
    2030: { hombres: 12673, mujeres: 12466, total: 25139 }
  },
  0: {
    2018: { hombres: 1140658, mujeres: 1286471, total: 2427129 },
    2019: { hombres: 1168926, mujeres: 1314619, total: 2483545 },
    2020: { hombres: 1186196, mujeres: 1333396, total: 2519592 },
    2021: { hombres: 1200312, mujeres: 1348696, total: 2549008 },
    2022: { hombres: 1211299, mujeres: 1361051, total: 2572350 },
    2023: { hombres: 1222233, mujeres: 1373067, total: 2595300 },
    2024: { hombres: 1232017, mujeres: 1384318, total: 2616335 },
    2025: { hombres: 1240438, mujeres: 1394132, total: 2634570 },
    2026: { hombres: 1247926, mujeres: 1402736, total: 2650662 },
    2027: { hombres: 1254858, mujeres: 1410616, total: 2665474 },
    2028: { hombres: 1261440, mujeres: 1417936, total: 2679376 },
    2029: { hombres: 1267765, mujeres: 1424835, total: 2692600 },
    2030: { hombres: 1273980, mujeres: 1431402, total: 2705382 }
  }
};

export const POPULATION_DATA: Record<number, PopulationRecord[]> = Object.fromEntries(
  Object.entries(POPULATION_BY_YEAR).map(([idStr, yearMap]) => [
    Number(idStr),
    Object.entries(yearMap).map(([yrStr, val]) => ({
      year: Number(yrStr),
      men: val.hombres,
      women: val.mujeres,
      total: val.total,
      hombres: val.hombres,
      mujeres: val.mujeres
    }))
  ])
);

// Quinquennial Age Cohort Distribution for Demographic Pyramid (17 Cohorts: 0-4 to 80+)
export const AGE_COHORTS = [
  { id: '0-4', label: '0 a 4 años', min: 0, max: 4, order: 1 },
  { id: '5-9', label: '5 a 9 años', min: 5, max: 9, order: 2 },
  { id: '10-14', label: '10 a 14 años', min: 10, max: 14, order: 3 },
  { id: '15-19', label: '15 a 19 años', min: 15, max: 19, order: 4 },
  { id: '20-24', label: '20 a 24 años', min: 20, max: 24, order: 5 },
  { id: '25-29', label: '25 a 29 años', min: 25, max: 29, order: 6 },
  { id: '30-34', label: '30 a 34 años', min: 30, max: 34, order: 7 },
  { id: '35-39', label: '35 a 39 años', min: 35, max: 39, order: 8 },
  { id: '40-44', label: '40 a 44 años', min: 40, max: 44, order: 9 },
  { id: '45-49', label: '45 a 49 años', min: 45, max: 49, order: 10 },
  { id: '50-54', label: '50 a 54 años', min: 50, max: 54, order: 11 },
  { id: '55-59', label: '55 a 59 años', min: 55, max: 59, order: 12 },
  { id: '60-64', label: '60 a 64 años', min: 60, max: 64, order: 13 },
  { id: '65-69', label: '65 a 69 años', min: 65, max: 69, order: 14 },
  { id: '70-74', label: '70 a 74 años', min: 70, max: 74, order: 15 },
  { id: '75-79', label: '75 a 79 años', min: 75, max: 79, order: 16 },
  { id: '80+', label: '80 y más años', min: 80, max: 100, order: 17 }
];

// Baseline proportion matrices [Hombres weight, Mujeres weight] for 17 cohorts in 2026
const ARCHETYPE_WEIGHTS: Record<string, [number, number][]> = {
  // Nororiental & Centro Oriental laderas (Younger structure, broad base)
  young: [
    [0.0681, 0.0619], // 0-4
    [0.0781, 0.0711], // 5-9
    [0.0796, 0.0715], // 10-14
    [0.0835, 0.0752], // 15-19
    [0.0961, 0.0843], // 20-24
    [0.0999, 0.0907], // 25-29
    [0.0935, 0.0877], // 30-34
    [0.0820, 0.0775], // 35-39
    [0.0662, 0.0697], // 40-44
    [0.0528, 0.0588], // 45-49
    [0.0429, 0.0491], // 50-54
    [0.0427, 0.0516], // 55-59
    [0.0404, 0.0492], // 60-64
    [0.0302, 0.0384], // 65-69
    [0.0198, 0.0272], // 70-74
    [0.0123, 0.0173], // 75-79
    [0.0118, 0.0187]  // 80+
  ],
  // Laureles, Poblado, La América, Centro (Aging / constrictive pyramid)
  aging: [
    [0.0448, 0.0522], // 0-4
    [0.0417, 0.0683], // 5-9
    [0.0462, 0.0841], // 10-14
    [0.0538, 0.0805], // 15-19
    [0.0601, 0.0784], // 20-24
    [0.0753, 0.0808], // 25-29
    [0.0915, 0.0803], // 30-34
    [0.0908, 0.0832], // 35-39
    [0.0753, 0.0871], // 40-44
    [0.0692, 0.0809], // 45-49
    [0.0722, 0.0610], // 50-54
    [0.0714, 0.0468], // 55-59
    [0.0670, 0.0863], // 60-64
    [0.0604, 0.0739], // 65-69
    [0.0488, 0.0596], // 70-74
    [0.0311, 0.0375], // 75-79
    [0.0333, 0.0471]  // 80+
  ],
  // Intermediate / Mixed (Castilla, Doce de Octubre, Robledo, Guayabal, Belén)
  intermediate: [
    [0.0558, 0.0528], // 0-4
    [0.0632, 0.0594], // 5-9
    [0.0684, 0.0645], // 10-14
    [0.0756, 0.0708], // 15-19
    [0.0884, 0.0792], // 20-24
    [0.0972, 0.0894], // 25-29
    [0.0984, 0.0924], // 30-34
    [0.0895, 0.0858], // 35-39
    [0.0754, 0.0768], // 40-44
    [0.0628, 0.0674], // 45-49
    [0.0524, 0.0588], // 50-54
    [0.0478, 0.0554], // 55-59
    [0.0442, 0.0538], // 60-64
    [0.0354, 0.0432], // 65-69
    [0.0242, 0.0326], // 70-74
    [0.0152, 0.0212], // 75-79
    [0.0161, 0.0264]  // 80+
  ],
  // Rural Corregimientos (Palmitas, San Cristóbal, Altavista, San Antonio de Prado, Santa Elena)
  rural: [
    [0.0634, 0.0592], // 0-4
    [0.0712, 0.0674], // 5-9
    [0.0748, 0.0702], // 10-14
    [0.0804, 0.0748], // 15-19
    [0.0892, 0.0814], // 20-24
    [0.0968, 0.0884], // 25-29
    [0.0954, 0.0878], // 30-34
    [0.0872, 0.0824], // 35-39
    [0.0724, 0.0734], // 40-44
    [0.0608, 0.0642], // 45-49
    [0.0504, 0.0558], // 50-54
    [0.0448, 0.0512], // 55-59
    [0.0402, 0.0474], // 60-64
    [0.0318, 0.0384], // 65-69
    [0.0214, 0.0278], // 70-74
    [0.0142, 0.0188], // 75-79
    [0.0156, 0.0214]  // 80+
  ]
};

// Generates the 17 quinquennial demographic cohorts (0-4, 5-9, ..., 80+) for any commune and year
export function getDemographicPyramid(communeId: number, year: number = 2026): DemographicCohort[] {
  const pop = POPULATION_BY_YEAR[communeId]?.[year] || POPULATION_BY_YEAR[0]?.[year] || { hombres: 60000, mujeres: 65000, total: 125000 };
  const totalHombres = pop.hombres;
  const totalMujeres = pop.mujeres;
  const totalPop = pop.total;

  // Determine demographic archetype
  let archetype = 'intermediate';
  if (communeId === 1 || communeId === 2 || communeId === 3 || communeId === 8 || communeId === 9 || communeId === 13) {
    archetype = 'young';
  } else if (communeId === 10 || communeId === 11 || communeId === 12 || communeId === 14) {
    archetype = 'aging';
  } else if (communeId >= 50) {
    archetype = 'rural';
  }

  const baseWeights = ARCHETYPE_WEIGHTS[archetype] || ARCHETYPE_WEIGHTS.intermediate;

  // Compute year factor delta relative to 2026 (aging progression)
  const yearDelta = (year - 2026);
  
  // Calculate raw populations for each cohort
  const rawCohorts = AGE_COHORTS.map((cohort, index) => {
    let [wH, wM] = baseWeights[index];

    // Dynamic adjustment for the selected year (aging trend)
    if (yearDelta !== 0) {
      if (index < 3) {
        // 0-14 decrease slightly over time
        wH *= (1 - yearDelta * 0.012);
        wM *= (1 - yearDelta * 0.012);
      } else if (index >= 12) {
        // 60+ increase over time
        wH *= (1 + yearDelta * 0.018);
        wM *= (1 + yearDelta * 0.020);
      }
    }

    return {
      cohort,
      rawH: wH,
      rawM: wM
    };
  });

  // Normalize weights so sum matches 1.0 exactly for men and women
  const sumH = rawCohorts.reduce((acc, c) => acc + c.rawH, 0);
  const sumM = rawCohorts.reduce((acc, c) => acc + c.rawM, 0);

  return rawCohorts.map(({ cohort, rawH, rawM }) => {
    const hCount = Math.round((rawH / sumH) * totalHombres);
    const mCount = Math.round((rawM / sumM) * totalMujeres);
    const cohortTotal = hCount + mCount;

    return {
      ageGroup: cohort.id,
      label: cohort.label,
      order: cohort.order,
      hombres: hCount,
      mujeres: mCount,
      total: cohortTotal,
      hombresPct: Number(((hCount / (totalHombres || 1)) * 100).toFixed(2)),
      mujeresPct: Number(((mCount / (totalMujeres || 1)) * 100).toFixed(2)),
      totalPct: Number(((cohortTotal / (totalPop || 1)) * 100).toFixed(2))
    };
  });
}

// Computes key demographic indices (Median Age, Aging Index, Dependency Ratio, etc.)
export function getDemographicIndicators(communeId: number, year: number = 2026): DemographicIndicators {
  const pyramid = getDemographicPyramid(communeId, year);
  const pop = POPULATION_BY_YEAR[communeId]?.[year] || POPULATION_BY_YEAR[0]?.[year] || { hombres: 60000, mujeres: 65000, total: 125000 };
  
  // 0-14 años (Cohorts 0-4, 5-9, 10-14 -> orders 1, 2, 3)
  const youthPop = pyramid
    .filter((c) => c.order <= 3)
    .reduce((acc, c) => acc + c.total, 0);

  // 15-64 años (Cohorts 15-19 to 60-64 -> orders 4 to 13)
  const workingAgePop = pyramid
    .filter((c) => c.order >= 4 && c.order <= 13)
    .reduce((acc, c) => acc + c.total, 0);

  // 65+ años (Cohorts 65-69, 70-74, 75-79, 80+ -> orders 14 to 17)
  const elderlyPop = pyramid
    .filter((c) => c.order >= 14)
    .reduce((acc, c) => acc + c.total, 0);

  const total = pop.total || 1;

  // Aging Index = (Población 65+ / Población 0-14) * 100
  const agingIndex = Number(((elderlyPop / (youthPop || 1)) * 100).toFixed(1));

  // Dependency Ratio = ((0-14 + 65+) / 15-64) * 100
  const dependencyRatio = Number((((youthPop + elderlyPop) / (workingAgePop || 1)) * 100).toFixed(1));

  // Sex Ratio = (Hombres / Mujeres) * 100
  const sexRatio = Number(((pop.hombres / (pop.mujeres || 1)) * 100).toFixed(1));

  // Estimate Median Age
  let medianAge = 35.4;
  if (communeId === 10 || communeId === 11 || communeId === 12 || communeId === 14) {
    medianAge = 40.8 + (year - 2026) * 0.18;
  } else if (communeId === 1 || communeId === 2 || communeId === 3 || communeId === 8 || communeId === 13) {
    medianAge = 33.2 + (year - 2026) * 0.22;
  } else if (communeId >= 50) {
    medianAge = 34.6 + (year - 2026) * 0.20;
  } else {
    medianAge = 36.1 + (year - 2026) * 0.20;
  }

  return {
    medianAge: Number(medianAge.toFixed(1)),
    agingIndex,
    dependencyRatio,
    sexRatio,
    youthShare: Number(((youthPop / total) * 100).toFixed(1)),
    workingAgeShare: Number(((workingAgePop / total) * 100).toFixed(1)),
    elderlyShare: Number(((elderlyPop / total) * 100).toFixed(1))
  };
}

// Broad Age Groups distribution (Primera Infancia, Niñez, Juventud, Adultos, Mayores)
export function getAgeDistribution(communeId: number, arg2?: number, arg3?: number): AgeGroupDistribution[] {
  let year = 2026;
  if (typeof arg3 === 'number') {
    year = arg3;
  } else if (typeof arg2 === 'number') {
    if (arg2 >= 2018 && arg2 <= 2035) {
      year = arg2;
    }
  }

  const pyramid = getDemographicPyramid(communeId, year);

  // Group 0-4
  const c0_4 = pyramid.find((c) => c.ageGroup === '0-4')!;
  // Group 5-14 (5-9 + 10-14)
  const c5_14 = pyramid.filter((c) => c.ageGroup === '5-9' || c.ageGroup === '10-14');
  // Group 15-24 (15-19 + 20-24)
  const c15_24 = pyramid.filter((c) => c.ageGroup === '15-19' || c.ageGroup === '20-24');
  // Group 25-39 (25-29 + 30-34 + 35-39)
  const c25_39 = pyramid.filter((c) => c.ageGroup === '25-29' || c.ageGroup === '30-34' || c.ageGroup === '35-39');
  // Group 40-59 (40-44 + 45-49 + 50-54 + 55-59)
  const c40_59 = pyramid.filter((c) => c.ageGroup === '40-44' || c.ageGroup === '45-49' || c.ageGroup === '50-54' || c.ageGroup === '55-59');
  // Group 60+ (60-64, 65-69, 70-74, 75-79, 80+)
  const c60_plus = pyramid.filter((c) => c.order >= 13);

  const sumH = (arr: DemographicCohort[]) => arr.reduce((acc, c) => acc + c.hombres, 0);
  const sumM = (arr: DemographicCohort[]) => arr.reduce((acc, c) => acc + c.mujeres, 0);

  return [
    {
      range: '0 a 4 años (Primera Infancia)',
      hombres: c0_4?.hombres || 0,
      mujeres: c0_4?.mujeres || 0,
      total: c0_4?.total || 0,
      men: c0_4?.hombres || 0,
      women: c0_4?.mujeres || 0
    },
    {
      range: '5 a 14 años (Niñez y Escolar)',
      hombres: sumH(c5_14),
      mujeres: sumM(c5_14),
      total: sumH(c5_14) + sumM(c5_14),
      men: sumH(c5_14),
      women: sumM(c5_14)
    },
    {
      range: '15 a 24 años (Juventud)',
      hombres: sumH(c15_24),
      mujeres: sumM(c15_24),
      total: sumH(c15_24) + sumM(c15_24),
      men: sumH(c15_24),
      women: sumM(c15_24)
    },
    {
      range: '25 a 39 años (Adultos Jóvenes)',
      hombres: sumH(c25_39),
      mujeres: sumM(c25_39),
      total: sumH(c25_39) + sumM(c25_39),
      men: sumH(c25_39),
      women: sumM(c25_39)
    },
    {
      range: '40 a 59 años (Adultos Medios)',
      hombres: sumH(c40_59),
      mujeres: sumM(c40_59),
      total: sumH(c40_59) + sumM(c40_59),
      men: sumH(c40_59),
      women: sumM(c40_59)
    },
    {
      range: '60+ años (Adultos Mayores)',
      hombres: sumH(c60_plus),
      mujeres: sumM(c60_plus),
      total: sumH(c60_plus) + sumM(c60_plus),
      men: sumH(c60_plus),
      women: sumM(c60_plus)
    }
  ];
}
