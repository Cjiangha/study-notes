const app = getApp()
const img = '../image/location.png'

Page({
    data: {
        latitude: 23.060360,
        longitude: 113.052878,
        count: 0,//起始数
        jishu: 100,//累加基数
        zuobiao : "113.013092,23.038373;113.0147,23.053472;113.003715,23.048772;113.008559,23.045571;113.015029,23.049131;113.010271,23.038185;113.014457,23.048414;113.023702,23.044821;113.015917,23.054191;113.015791,23.053867;113.016156,23.05383;113.01612,23.053654;113.016065,23.053836;113.016057,23.053387;113.015927,23.053117;113.015791,23.052743;113.01576,23.052551;113.01485,23.052655;113.014476,23.05239;113.015553,23.052054;113.015693,23.051787;113.015783,23.051564;113.015959,23.051114;113.016153,23.050754;113.016199,23.050597;113.017247,23.051481;113.016923,23.051408;113.016711,23.051615;113.017382,23.05386;113.017216,23.053485;113.017113,23.053091;113.016977,23.052757;113.017657,23.053809;113.017572,23.053641;113.017532,23.053446;113.017496,23.053297;113.017429,23.053028;113.017276,23.05264;113.017149,23.052334;113.016041,23.052356;113.01637,23.051948;113.018209,23.052246;113.018254,23.052312;113.018317,23.052606;113.018461,23.053002;113.018551,23.053076;113.018515,23.053242;113.018529,23.053587;113.018499,23.052266;113.018759,23.05301;113.018867,23.053345;113.0168,23.038281;113.018424,23.036525;113.018091,23.036564;113.018112,23.036966;113.018175,23.037314;113.018211,23.037638;113.018676,23.03721;113.018991,23.037234;113.018725,23.037708;113.018985,23.037667;113.019157,23.037636;113.019526,23.037958;113.020267,23.036118;113.020181,23.036585;113.019902,23.036772;113.020029,23.036824;113.019948,23.036539;113.020038,23.036612;113.020935,23.03583;113.021134,23.03549;113.02127,23.035064;113.02141,23.034825;113.021455,23.034491;113.0216,23.034073;113.021874,23.035137;113.021332,23.03591;113.021229,23.03621;113.021143,23.036486;113.020999,23.036838;113.022118,23.034955;113.021326,23.038187;113.021384,23.038739;113.021664,23.03881;113.021844,23.038704;113.021962,23.038502;113.022916,23.039063;113.02292,23.038847;113.023515,23.03361;113.023411,23.033881;113.023353,23.03409;113.025261,23.035104;113.025068,23.03479;113.024789,23.034578;113.024461,23.034482;113.024182,23.034378;113.023935,23.034256;113.024137,23.033912;113.024583,23.033977;113.024934,23.034035;113.025046,23.03432;113.02504,23.035654;113.024865,23.035523;113.024527,23.035482;113.024257,23.03536;113.023965,23.03521;113.023582,23.035011;113.024945,23.036082;113.02374,23.035611;113.02351,23.035485;113.023366,23.03535;113.024422,23.036986;113.023716,23.036102;113.02317,23.036197;113.022318,23.037127;113.023573,23.034409;113.022735,23.035347;113.022175,23.036755;113.027096,23.038072;113.078672,23.065585;113.093769,23.072646;113.026731,23.037936;113.026321,23.037882;113.093652,23.07231;113.093387,23.072265;113.023254,23.038212;113.023682,23.038189;113.093145,23.072282;113.023966,23.03819;113.024353,23.038209;113.092732,23.072315;113.025474,23.037571;113.026284,23.038181;113.091436,23.072531;113.026485,23.038685;113.026019,23.036779;113.091692,23.072556;113.09196,23.072564;113.092207,23.072585;113.092463,23.072651;113.092794,23.072709;113.026033,23.036596;113.026329,23.036667;113.026811,23.036724;113.027108,23.036746;113.026046,23.036292;113.092884,23.073468;113.025754,23.035555;113.092893,23.073237;113.025845,23.035081;113.093257,23.073499;113.025949,23.03431;113.016761,23.041024;113.091561,23.070497;113.091865,23.070411;113.017018,23.041056;113.092,23.070476;113.017171,23.041004;113.091775,23.070539;113.091874,23.070575;113.017184,23.040763;113.017347,23.040639;113.091991,23.070637;113.01741,23.040505;113.017257,23.040313;113.092305,23.070576;113.092224,23.070772;113.016928,23.040019;113.090341,23.069699;113.088346,23.069155;113.016653,23.036051;113.016531,23.035575;113.016594,23.035786;113.015788,23.035367;113.015062,23.035595;113.014202,23.035182;113.011491,23.041214;113.011892,23.041373;113.011176,23.04124;113.010847,23.041159;113.010545,23.041122;113.011252,23.041484;113.010509,23.041293;113.0091,23.043271;113.008965,23.043647;113.014177,23.037675;113.088421,23.070883;113.088578,23.070905;113.088896,23.070927;113.089255,23.070871;113.089434,23.070911;113.089748,23.070904;113.088452,23.071167;113.090999,23.07226;113.090756,23.072281;113.09042,23.07228;113.090186,23.072293;113.089886,23.072256;113.089554,23.072263;113.088331,23.072515;113.088546,23.072523;113.013997,23.03777;113.014138,23.037152;113.088784,23.07251;113.005339,23.046096;113.004438,23.046112;113.089053,23.072577;113.002063,23.046242;113.089129,23.072497;112.999847,23.04557;113.001681,23.045051;113.001946,23.045812;113.089496,23.072519;113.002442,23.04592;113.002988,23.045309;113.089815,23.072566;113.002,23.045828;113.089998,23.072499;113.090187,23.072569;113.002762,23.045583;113.090111,23.072837;113.003015,23.045899;113.001964,23.045675;113.090385,23.072583;113.002186,23.045035;113.090613,23.072546;113.002731,23.044989;113.09099,23.072609;113.003574,23.04527;113.004088,23.045274;113.005526,23.045187;113.005166,23.045201;113.004764,23.045241;113.090461,23.073472;113.004412,23.045767;113.004413,23.045534;113.089671,23.0735;113.089371,23.073537;113.005036,23.044339;113.00431,23.044351;113.003932,23.044312;113.089106,23.073607;113.088851,23.073582;113.003351,23.044363;113.088635,23.07357;113.088299,23.073597;113.002738,23.044149;113.003086,23.043924;113.088272,23.073994;113.088528,23.073974;113.088846,23.073933;113.004312,23.043973;113.089123,23.073984;113.089482,23.07396;113.003518,23.04373;113.00382,23.043974;113.090078,23.07393;113.00474,23.043987;113.090454,23.073978;113.005651,23.043846;113.089383,23.075271;113.005439,23.04348;113.004349,23.043287;113.088312,23.075841;113.088707,23.075847;113.005719,23.043039;113.088984,23.075834;113.089195,23.075859;113.089437,23.075885;113.012631,23.036646;113.089899,23.075895;113.01274,23.035577;113.090671,23.075936;113.012745,23.035219;113.013114,23.035125;113.090653,23.076649;113.013471,23.034932;113.09012,23.076639;113.013502,23.034454;113.089762,23.076617;113.089461,23.076599;113.089157,23.076577;113.088973,23.076552;113.0887,23.076614;113.017773,23.044626;113.088306,23.076654;113.017183,23.04501;113.017048,23.045178;113.016831,23.045443;113.01609,23.046038;113.015401,23.045895;113.015572,23.046499;113.015987,23.046567;113.016742,23.048707;113.088517,23.077394;113.016189,23.047819;113.088925,23.077371;113.015228,23.048404;113.089229,23.07738;113.089542,23.077373;113.014705,23.048662;113.089874,23.077432;113.090093,23.077374;113.090313,23.077415;113.09056,23.077448;113.014647,23.049037;113.01448,23.049392;113.090846,23.077419;113.088901,23.078302;113.089484,23.078251;113.014305,23.051467;113.014256,23.051235;113.014734,23.051618;113.009535,23.052723;113.010275,23.052618;113.009977,23.05424;113.014229,23.052441;113.013699,23.054732;113.013845,23.052727;113.014354,23.053857;113.014287,23.052811;113.013534,23.053057;113.013353,23.054332;113.013052,23.052492;113.01243,23.052593;113.012858,23.052657;113.012596,23.053023;113.01247,23.052261;113.011528,23.052215;113.010415,23.052281;113.009622,23.051987;113.009749,23.05174;113.010109,23.052199;113.088396,23.081098;113.088952,23.08118;113.0891,23.081217;113.089307,23.081175;113.089463,23.081191;113.089899,23.081214;113.090481,23.08108;113.090773,23.081102;113.090684,23.081905;113.090522,23.081956;113.089782,23.08198;113.089424,23.081879;113.088922,23.081984;113.088528,23.081941;113.088448,23.083032;113.088766,23.083382;113.088833,23.08311;113.089115,23.08299;113.089711,23.083073;113.08954,23.082616;113.090796,23.082696;113.090531,23.0827;113.090236,23.082699;113.090262,23.083026;113.090231,23.083243;113.0902,23.083428;113.090684,23.083018;113.09068,23.083461;113.088263,23.083744;113.088658,23.083792;113.088958,23.083851;113.089133,23.0839;113.089464,23.083723;113.089755,23.083785;113.090186,23.083816;113.090643,23.083706;113.090469,23.084488;113.090379,23.084738;113.090105,23.084729;113.089819,23.084384;113.089689,23.084734;113.089313,23.084757;113.089102,23.08472;113.088856,23.084745;113.088658,23.08467;113.088196,23.084825;113.088443,23.084759;113.088573,23.085726;113.087517,23.088183;113.00972,23.053815;113.009733,23.054534;113.087544,23.087736;113.009651,23.054859;113.087557,23.087568;113.087475,23.087075;113.086145,23.087266;113.087276,23.084863;113.086841,23.084775;113.012631,23.054699;113.010657,23.054737;113.086483,23.084769;113.086483,23.084769;113.085865,23.084917;113.086133,23.084933;113.009383,23.046764;113.08767,23.083973;113.008963,23.047092;113.009226,23.046247;113.085693,23.0841;113.011125,23.054787;113.011189,23.054499;113.085487,23.083772;113.010747,23.054399;113.011415,23.054503;113.011802,23.054504;113.012721,23.054555;113.012459,23.054573;113.011958,23.054814;113.009308,23.055102;113.008307,23.054862;113.008452,23.054302;113.007866,23.054762;113.007338,23.049543;113.008176,23.049208;113.010566,23.048763;113.010427,23.048699;113.010576,23.048567;113.010607,23.04867;113.009606,23.049199;113.009823,23.04885;113.009331,23.048913;113.085705,23.081673;113.085543,23.08165;113.00961,23.048638;113.009637,23.048592;113.085328,23.081843;113.009827,23.04848;113.009592,23.048156;113.008992,23.049293;113.085484,23.081609;113.085364,23.081589;113.085148,23.081509;113.085085,23.081724;113.084897,23.081741;113.084893,23.081496;113.009542,23.049869;113.008892,23.05005;113.009163,23.050162;113.009163,23.049717;113.008149,23.049747;113.007861,23.049831;113.007491,23.049895;113.007436,23.050827;113.084772,23.081697;113.008356,23.050811;113.084598,23.081804;113.084558,23.081509;113.084263,23.081505;113.084566,23.081085;113.009518,23.051688;113.008842,23.051376;113.084254,23.081904;113.008824,23.05121;113.084348,23.082142;113.08437,23.082329;113.00866,23.053458;113.084339,23.082558;113.010337,23.047647;113.010026,23.047553;113.084303,23.082733;113.084352,23.082895;113.010062,23.047365;113.084356,23.083057;113.084603,23.08297;113.01054,23.047399;113.010711,23.047205;113.086141,23.076925;113.010851,23.047056;113.011135,23.046856;113.084461,23.077004;113.011257,23.046879;113.011776,23.046242;113.011848,23.046894;113.085353,23.076975;113.085325,23.076468;113.011831,23.045905;113.012102,23.04482;113.01257,23.04477;113.085401,23.076116;113.012755,23.04502;113.085356,23.075729;113.012468,23.044099;113.02336,23.043289;113.085692,23.075542;113.085361,23.07538;113.085805,23.075378;113.084775,23.07529;113.084465,23.075265;113.084214,23.075208;113.02736,23.046539;113.084026,23.075267;113.027166,23.046533;113.086921,23.077127;113.027553,23.04667;113.029788,23.047898;113.0871,23.076967;113.087396,23.077007;113.028465,23.047504;113.028851,23.04797;113.030214,23.048584;113.030016,23.049002;113.08744,23.076339;113.029485,23.048699;113.087427,23.075607;113.029053,23.048794;113.028797,23.048796;113.00437,23.048785;113.087831,23.076206;113.015619,23.037057;113.086611,23.075299;113.016002,23.036925;113.085791,23.074833;113.085244,23.074722;113.015999,23.036451;113.085934,23.074402;113.015126,23.03566;113.084742,23.074533;113.084393,23.074956;113.084429,23.074238;113.084138,23.074375;113.016544,23.037187;113.084003,23.074327;113.08753,23.07429;113.013989,23.038291;113.013993,23.038129;113.013998,23.037967;113.014197,23.038359;113.01653,23.035815;113.017265,23.035271;113.058291,23.052888;113.058847,23.053266;113.058999,23.053218;113.058888,23.053101;113.059044,23.052849;113.084129,23.073824;113.059317,23.052998;113.05942,23.052913;113.05933,23.052853;113.05946,23.052734;113.059322,23.052661;113.059469,23.052779;113.059313,23.052636;113.059438,23.052588;113.059711,23.052954;113.084344,23.073841;113.059828,23.052939;113.059702,23.052762;113.08499,23.073752;113.059778,23.052809;113.059702,23.052725;113.085344,23.073849;113.059697,23.052654;113.059764,23.052642;113.059697,23.052583;113.085975,23.073884;113.060028,23.052941;113.086191,23.073759;113.060104,23.052842;113.060073,23.052771;113.086334,23.073771;113.060431,23.053092;113.086473,23.073729;113.060937,23.05305;113.061945,23.053033;113.062107,23.052824;113.063973,23.052818;113.030664,23.057188;113.031968,23.060747;113.050844,23.045439;113.050888,23.04559;113.051041,23.045986;113.052324,23.045114;113.033546,23.055697;113.036275,23.054305;113.03721,23.054659;113.035174,23.053968;113.086773,23.073817;113.029729,23.056341;113.030625,23.055822;113.030949,23.055791;113.087096,23.073782;113.03031,23.055742;113.032695,23.055583;113.031453,23.055106;113.087576,23.07386;113.085805,23.073144;113.085998,23.073323;113.085281,23.072668;113.084968,23.072637;113.085406,23.072508;113.085433,23.071995;113.085451,23.071773;113.085464,23.072117;113.035925,23.053089;113.036073,23.053068;113.031629,23.054875;113.086235,23.07288;113.035844,23.053044;113.086621,23.072861;113.035781,23.052969;113.036127,23.053017;113.034034,23.055313;113.035893,23.052793;113.087786,23.073288;113.032794,23.062368;113.033365,23.05488;113.087701,23.07181;113.032253,23.056849;113.036541,23.052687;113.034255,23.054559;113.084999,23.071702;113.084632,23.071712;113.086505,23.071754;113.086025,23.071775;113.086804,23.071516;113.087144,23.071801;113.087498,23.071774;113.087808,23.071792;113.08791,23.071766;113.087529,23.072628;113.087301,23.071489;113.087373,23.071438;113.087668,23.071422;113.087794,23.071417;113.034894,23.054842;113.035172,23.055011;113.033872,23.049374;113.033737,23.049079;113.032487,23.04831;113.032971,23.057055;113.033047,23.057395;113.033956,23.055457;113.03274,23.057721;113.032632,23.0583;113.032574,23.058504;113.032528,23.058882;113.033133,23.056535;113.039923,23.05163;113.039788,23.051788;113.039522,23.052382;113.040125,23.051542;113.039675,23.052439;113.039401,23.052635;113.039765,23.051908;113.038992,23.052885;113.037362,23.052115;113.03994,23.051879;113.039275,23.052581;113.039927,23.051475;113.038548,23.051218;113.036225,23.052739;113.030021,23.056638;113.033314,23.056178;113.038062,23.055203;113.038749,23.055352;113.039535,23.055633;113.040072,23.057391;113.03859,23.058003;113.037144,23.057195;113.028191,23.04966;113.012589,23.044882;113.025834,23.037318;113.026518,23.038503;113.026027,23.034016;112.999915,23.045426;113.011989,23.041032;113.08373,23.071794;113.083913,23.072314;113.083877,23.072814;113.083842,23.07319;113.083766,23.073619;113.08386,23.073714;113.084102,23.073752;113.08425,23.073777;113.037714,23.037341;113.038302,23.03744;113.038473,23.03749;113.038666,23.037535;113.039488,23.037754;113.03925,23.03751;113.039282,23.037248;113.041019,23.037518;113.040754,23.037526;113.039762,23.037217;113.04009,23.036697;113.040364,23.037163;113.040253,23.035913;113.039871,23.035996;113.039525,23.036046;113.039247,23.036017;113.039457,23.036848;113.039569,23.03654;113.04015,23.035318;113.03887,23.035193;113.038833,23.035862;113.038833,23.035862;113.038622,23.035555;113.038097,23.035161;113.037661,23.035208;113.029457,23.032953;113.030057,23.029859;113.048147,23.035609;113.047232,23.035585;113.046811,23.035359;113.049053,23.036671;113.048846,23.036437;113.047852,23.035308;113.047023,23.034716;113.046246,23.035322;113.046421,23.034928;113.046551,23.034763;113.046368,23.034313;113.046238,23.034034;113.04483,23.033819;113.04122,23.034474;113.041318,23.035334;113.041691,23.03531;113.041965,23.035688;113.042239,23.035847;113.042404,23.036342;113.042834,23.037021;113.042654,23.037689;113.044188,23.038097;113.043989,23.038915;113.044317,23.039045;113.045072,23.038849;113.047807,23.040107;113.047972,23.041014;113.047626,23.041403;113.047455,23.041552;113.047464,23.04203;113.047512,23.042471;113.047364,23.042399;113.046997,23.042296;113.046822,23.042594;113.048383,23.041998;113.02706,23.075802;113.026682,23.074461;113.026916,23.074159;113.025728,23.075091;113.025939,23.07503;113.024606,23.07518;113.021449,23.077617;113.021449,23.077617;113.02084,23.078084;113.021057,23.078172;113.02713,23.070441;113.026896,23.070589;113.026261,23.07033;113.02428,23.071473;113.024942,23.070221;113.02555,23.069508;113.026059,23.069307;113.025933,23.068867;113.02505,23.069065;113.024704,23.068915;113.026279,23.068605;113.023924,23.068912;113.023276,23.069357;113.023442,23.069455;113.02337,23.069626;113.012524,23.073647;113.011167,23.072686;113.010225,23.07407;113.010923,23.072698;113.01114,23.072259;113.011329,23.071952;113.01201,23.073324;113.011518,23.071247;113.012095,23.070364;113.012542,23.069766;113.014151,23.072364;113.013979,23.072188;113.013677,23.072039;113.014042,23.07271;113.013903,23.072454;113.013551,23.07219;113.013078,23.072161;113.012843,23.071883;113.012482,23.071694;113.012748,23.071411;113.01328,23.06917;113.014132,23.068843;113.014664,23.06888;113.014966,23.070862;113.013059,23.069366;113.013276,23.069507;113.013358,23.070117;113.014494,23.068115;113.013291,23.06706;113.013363,23.065675;113.015396,23.068503;113.015365,23.069609;113.015175,23.069325;113.01206,23.066856;113.012614,23.066174;113.01265,23.066668;113.012817,23.065713;113.0133,23.064857;113.012476,23.076857;113.011844,23.076993;113.011385,23.077159;113.010412,23.078203;113.009091,23.078596;113.009082,23.079037;113.009114,23.079382;113.009132,23.079685;113.00846,23.078163;113.013556,23.072226;113.012592,23.066907;113.027626,23.075735;113.032963,23.065002;113.033013,23.0641;113.032325,23.064071;113.031843,23.064341;113.031186,23.064246;113.030826,23.064349;113.030426,23.064394;113.030034,23.063791;113.030287,23.063892;113.029324,23.064038;113.031749,23.063507;113.031925,23.06289;113.03201,23.061111;113.030579,23.065029;113.030295,23.064973;113.030021,23.064968;113.029661,23.065137;113.027825,23.065076;113.028041,23.065087;113.028216,23.065064;113.028657,23.065013;113.028617,23.065538;113.028928,23.064949;113.029184,23.066027;113.083243,23.078878;113.029923,23.065821;113.02999,23.066133;113.031259,23.066342;113.030737,23.066442;113.030282,23.066529;113.0298,23.066638;113.028873,23.066555;113.028311,23.066665;113.02895,23.066771;113.028352,23.066934;113.029472,23.067124;113.029909,23.067544;113.083239,23.078186;113.029801,23.06806;113.029725,23.068413;113.029145,23.068398;113.031142,23.067565;113.031021,23.067587;113.030868,23.067642;113.030611,23.067769;113.031251,23.067336;113.030584,23.06755;113.082603,23.078929;113.028821,23.06432;113.028533,23.063371;113.082365,23.078895;113.081895,23.078678;113.028326,23.063693;113.028353,23.063352;113.081912,23.077878;113.027403,23.064472;113.081813,23.077393;113.026854,23.064249;113.082189,23.077467;113.026521,23.064435;113.02603,23.064441;113.083246,23.077372;113.026993,23.065016;113.024475,23.065295;113.024255,23.065755;113.082588,23.076239;113.024152,23.065117;113.025489,23.064605;113.025562,23.063586;113.082131,23.076263;113.025615,23.065206;113.025597,23.066765;113.08218,23.076025;113.083295,23.075972;113.024592,23.067327;113.024236,23.067156;113.083232,23.075674;113.024565,23.066977;113.024547,23.066528;113.027883,23.067366;113.027523,23.067515;113.02715,23.06759;113.026271,23.067891;113.082085,23.075627;113.025574,23.06736;113.024628,23.067529;113.081879,23.075979;113.02443,23.067973;113.081861,23.076259;113.029374,23.063138;113.02897,23.062735;113.087581,23.070649;113.027844,23.063112;113.016934,23.055302;113.015819,23.059684;113.016556,23.055778;113.016425,23.056266;113.01628,23.056971;113.016442,23.057105;113.017537,23.057727;113.016131,23.057812;113.01714,23.058252;113.016209,23.055483;113.01634,23.054953;113.016091,23.056067;113.015915,23.05681;113.015806,23.057443;113.015675,23.058182;113.015557,23.058732;113.016986,23.058597;113.015557,23.059048;113.01534,23.059397;113.014911,23.062351;113.015173,23.062048;113.01497,23.061868;113.015876,23.062543;113.019521,23.055501;113.019922,23.055108;113.020183,23.054747;113.020486,23.05434;113.020824,23.053994;113.018024,23.067473;113.018898,23.066748;113.019317,23.06677;113.019695,23.06671;113.016865,23.066207;113.016992,23.065586;113.016965,23.064909;113.016925,23.063804;113.016817,23.063029;113.017817,23.062725;113.018146,23.063111;113.017393,23.063929;113.017844,23.063689;113.017361,23.064458;113.01741,23.064997;113.018708,23.065508;113.018366,23.065571;113.019155,23.065202;113.017478,23.065591;113.017411,23.065945;113.015316,23.063096;113.01477,23.063666;113.01508,23.064604;113.015184,23.065005;113.014841,23.064774;113.014697,23.064943;113.013715,23.063406;113.01363,23.063756;113.013251,23.063875;113.013026,23.062179;113.012881,23.062006;113.013702,23.061402;113.014433,23.060204;113.014037,23.059492;113.017817,23.061092;113.018164,23.061082;113.018538,23.061118;113.01903,23.061052;113.019238,23.061107;113.018805,23.060869;113.01781,23.059617;113.018363,23.059529;113.018917,23.059499;113.018948,23.059744;113.019471,23.059481;113.020981,23.059703;113.019927,23.058988;113.086671,23.070371;113.019724,23.058381;113.086121,23.070219;113.019878,23.058823;113.026588,23.059734;113.026525,23.058181;113.025873,23.058093;113.083361,23.075269;113.025855,23.057848;113.083025,23.075163;113.08264,23.075188;113.026526,23.056863;113.026653,23.056783;113.082327,23.075153;113.081951,23.075154;113.026946,23.056376;113.02686,23.056211;113.082135,23.074865;113.082135,23.074865;113.02664,23.056563;113.082122,23.074547;113.025329,23.05797;113.025302,23.057705;113.08304,23.074807;113.082776,23.074818;113.024608,23.05778;113.024014,23.057505;113.082512,23.074884;113.025121,23.057944;113.08265,23.074381;113.023262,23.057008;113.023051,23.056475;113.023217,23.056585;113.023266,23.056385;113.022405,23.056983;113.021783,23.058102;113.022645,23.055958;113.082744,23.074143;113.022244,23.055507;113.082431,23.074128;113.021974,23.055511;113.082229,23.074132;113.081759,23.074256;113.021803,23.055521;113.022564,23.055248;113.022267,23.05519;113.023028,23.055292;113.02197,23.054866;113.018115,23.058731;113.030137,23.061153;113.02989,23.061637;113.081803,23.07381;113.028179,23.061413;113.02696,23.06168;113.02673,23.061574;113.025438,23.06154;113.024007,23.06086;113.083121,23.07377;113.083246,23.073483;113.024907,23.061355;113.083241,23.073203;113.083228,23.072644;113.083264,23.072276;113.026116,23.056715;113.08188,23.07213;113.08188,23.07213;113.033057,23.060849;113.033295,23.061101;113.08209,23.071454;113.033165,23.061297;113.083196,23.071421;113.083156,23.070995;113.083111,23.070518;113.083066,23.070282;113.082655,23.070533;113.038144,23.069947;113.082633,23.070297;113.040094,23.070061;113.08223,23.070548;113.039798,23.069965;113.081813,23.070432;113.03925,23.07122;113.08214,23.070879;113.043193,23.072201;113.041564,23.073303;113.08175,23.06921;113.043969,23.072927;113.081853,23.069271;113.043759,23.072481;113.082279,23.069262;113.037853,23.071397;113.082731,23.06925;113.036825,23.076092;113.083018,23.069277;113.083264,23.069561;113.038977,23.076225;113.081692,23.068843;113.037022,23.076353;113.082587,23.068812;113.036936,23.074196;113.082815,23.068784;113.083044,23.068436;113.039736,23.07605;113.082403,23.068392;113.082197,23.068333;113.039982,23.074413;113.082014,23.068361;113.040916,23.073985;113.081825,23.068374;113.048074,23.074389;113.055397,23.081886;113.082215,23.067995;113.081683,23.067417;113.081857,23.067475;113.08226,23.067508;113.082439,23.067513;113.083241,23.067086;113.083214,23.066929;113.08286,23.066893;113.082122,23.066449;113.080371,23.065822;113.081248,23.067894;113.08102,23.068429;113.081194,23.068305;113.080401,23.068366;113.080044,23.068325;113.08114,23.069986;113.081297,23.072097;113.08123,23.072509;113.081342,23.073348;113.080549,23.073363;113.081333,23.07371;113.081275,23.073977;113.08123,23.074211;113.08132,23.074364;113.081182,23.075233;113.080559,23.074308;113.080439,23.074329;113.080205,23.074353;113.080035,23.074348;113.07987,23.074365;113.080192,23.075295;113.080008,23.074658;113.079346,23.075732;113.079332,23.074874;113.079319,23.074623;113.079341,23.074372;113.07939,23.074134;113.079323,23.07399;113.079381,23.073802;113.079336,23.073608;113.079273,23.07343;113.079744,23.073926;113.079766,23.073641;113.079748,23.073477;113.079681,23.073067;113.080411,23.072897;113.080684,23.072334;113.080423,23.072374;113.080249,23.072406;113.079582,23.072548;113.079497,23.072296;113.07947,23.072197;113.07939,23.072055;113.081732,23.06531;113.082009,23.065487;113.082444,23.065599;113.082591,23.065686;113.081736,23.065069;113.082739,23.064852;113.081226,23.065098;113.081902,23.064591;113.08273,23.06463;113.082811,23.065776;113.083321,23.06576;113.083514,23.065441;113.082998,23.065265;113.083128,23.065095;113.083415,23.064054;113.083657,23.06457;113.083294,23.064202;113.083258,23.064307;113.083227,23.064492;113.084047,23.063148;113.083581,23.064976;113.088044,23.066645;113.087443,23.067131;113.088025,23.068;113.087909,23.067634;113.087905,23.067299;113.08782,23.06686;113.088115,23.066841;113.086502,23.067428;113.086439,23.067329;113.086399,23.067248;113.086359,23.067149;113.086194,23.067324;113.088456,23.068195;113.088363,23.06803;113.088323,23.067716;113.090866,23.063377;113.090485,23.063875;113.089982,23.064476;113.089767,23.064568;113.089605,23.064589;113.087051,23.062209;113.087015,23.062593;113.089905,23.068883;113.089775,23.068203;113.089721,23.067996;113.089717,23.067641;113.090941,23.068991;113.06599,23.082435;113.066285,23.082504;113.06667,23.082642;113.066634,23.083313;113.066415,23.083714;113.066089,23.084238;113.065843,23.08417;113.065636,23.083952;113.065471,23.083943;113.064011,23.083176;113.061499,23.081607;113.065546,23.083507;113.065058,23.083292;113.064776,23.083131;113.064524,23.082992;113.064269,23.082845;113.063938,23.082687;113.063629,23.082559;113.063298,23.082364;113.063003,23.082087;113.062784,23.081985;113.06252,23.081828;113.062189,23.081651;113.062783,23.081072;113.062147,23.08091;113.060938,23.080655;113.060687,23.080574;113.060194,23.080395;113.064152,23.081417;113.064335,23.080853;113.064607,23.080125;113.064706,23.079967;113.064764,23.079671;113.06488,23.079305;113.064859,23.080324;113.064733,23.080598;113.064667,23.080923;113.064412,23.081445;113.064953,23.081535;113.065257,23.081638;113.06553,23.081745;113.065678,23.081742;113.065911,23.081665;113.062522,23.079521;113.063597,23.079558;113.063417,23.079308;113.062952,23.080025;113.062688,23.079242;113.064182,23.078542;113.064486,23.078657;113.035763,23.07292;113.064043,23.078763;113.036244,23.072329;113.064003,23.079027;113.037839,23.070907;113.063708,23.078338;113.038122,23.070957;113.037142,23.069974;113.035547,23.070095;113.035255,23.071302;113.03427,23.072644;113.06386,23.078022;113.063511,23.077881;113.063193,23.078011;113.064415,23.078271;113.064742,23.077177;113.06484,23.076973;113.06488,23.076809;113.065054,23.076498;113.065207,23.075838;113.065005,23.075666;113.065364,23.078285;113.065489,23.077732;113.065722,23.077293;113.06578,23.077092;113.065923,23.076714;113.065923,23.076475;113.066111,23.075824;113.0663,23.076378;113.065866,23.077744;113.066161,23.077855;113.06608,23.078121;113.066506,23.078006;113.066748,23.078158;113.066904,23.0782;113.067168,23.078331;113.06733,23.078403;113.06775,23.078579;113.067952,23.078996;113.066314,23.079306;113.067013,23.079492;113.067456,23.079693;113.067363,23.079984;113.067801,23.079749;113.067335,23.079331;113.066351,23.07996;113.066208,23.080114;113.066172,23.080269;113.06606,23.080381;113.06551,23.080231;113.065766,23.080466;113.066021,23.080534;113.065555,23.080507;113.065864,23.080864;113.066491,23.08069;113.067016,23.081653;113.067292,23.081074;113.066908,23.080932;113.066755,23.080798;113.067928,23.080983;113.067748,23.080608;113.067502,23.080435;113.067229,23.080321;113.066956,23.08021;113.066643,23.080127;113.062922,23.068175;113.063119,23.068163;113.063218,23.068117;113.060957,23.066889;113.061159,23.067177;113.065997,23.070125;113.065961,23.070367;113.065607,23.070542;113.065715,23.070575;113.066024,23.071147;113.065814,23.071744;113.06891,23.067288;113.068007,23.067399;113.068611,23.067229;113.068722,23.067054;113.068893,23.066855;113.067608,23.067029;113.067384,23.066815;113.067057,23.065751;113.067165,23.064259;113.067063,23.064014;113.066875,23.06378;113.067756,23.065993;113.067734,23.066248;113.067922,23.066266;113.068244,23.066133;113.068406,23.065847;113.068853,23.0655;113.068052,23.064732;113.068294,23.06478;113.068898,23.064627;113.068791,23.064332;113.068097,23.063848;113.06982,23.063676;113.070505,23.06377;113.069716,23.063981;113.069694,23.064706;113.069838,23.064715;113.070124,23.064693;113.070706,23.064755;113.07105,23.064559;113.071534,23.064732;113.071767,23.064476;113.069913,23.064973;113.070948,23.06501;113.07101,23.06547;113.070992,23.065775;113.070889,23.066274;113.07106,23.066745;113.070039,23.067161;113.069896,23.066978;113.069802,23.066812;113.069718,23.066546;113.071021,23.064191;113.070994,23.06388;113.07145,23.065162;113.07085,23.063483;113.036205,23.065826;113.037836,23.064886;113.079286,23.071606;113.079474,23.071524;113.038694,23.064291;113.079703,23.071509;113.039359,23.063787;113.079864,23.071451;113.080083,23.07144;113.079394,23.071888;113.078454,23.071622;113.077961,23.071026;113.078319,23.070876;113.078659,23.070783;113.07886,23.071076;113.079451,23.070559;113.079814,23.070463;113.079796,23.070169;113.079483,23.070203;113.079277,23.071353;113.079626,23.07127;113.079993,23.071152;113.077678,23.070349;113.077915,23.070333;113.078113,23.070277;113.078556,23.070211;113.077607,23.069628;113.077947,23.069595;113.078274,23.069573;113.07844,23.06952;113.078122,23.070032;113.077491,23.068839;113.078991,23.069431;113.079282,23.069425;113.079622,23.069317;113.079582,23.068645;113.079242,23.068709;113.078888,23.069175;113.07781,23.068869;113.078244,23.068745;113.07777,23.068294;113.07708,23.067653;113.077465,23.067586;113.07776,23.067539;113.078109,23.067422;113.078727,23.068152;113.079085,23.068052;113.079465,23.067994;113.078615,23.067954;113.078423,23.067247;113.078656,23.067223;113.078616,23.067038;113.078277,23.066668;113.076953,23.065883;113.07822,23.066059;113.076541,23.067202;113.078117,23.067114;113.076756,23.06829;113.076703,23.067905;113.076747,23.067713;113.074402,23.065427;113.074621,23.065416;113.074899,23.065431;113.01186,23.054781;113.07094,23.064186;113.102542,23.058637;113.07523,23.064583;113.075015,23.06476;113.07476,23.064869;113.075235,23.06407;113.07519,23.063801;113.075127,23.063569;113.075042,23.063191;113.074926,23.062692;113.075105,23.062719;113.075289,23.062774;113.075526,23.062901;113.074524,23.062636;113.07443,23.062907;113.074344,23.064545;113.074747,23.063914;113.074403,23.063623;113.074268,23.063577;113.074009,23.063591;113.073718,23.063517;113.073485,23.063503;113.073297,23.063473;113.073131,23.063464;113.073135,23.063287;113.073439,23.063278;113.073699,23.06333;113.079106,23.064001;113.079174,23.062113;113.079963,23.062061;113.080356,23.062015;113.081023,23.062027;113.081203,23.061845;113.080908,23.061789;113.080626,23.061732;113.080039,23.061808;113.079964,23.061593;113.080031,23.061156;113.079046,23.060877;113.080728,23.064189;113.080451,23.064166;113.080326,23.064141;113.080146,23.064015;113.080272,23.064314;113.080374,23.064733;113.080827,23.064568;113.080863,23.064413;113.07999,23.06438;113.079968,23.064037;113.080031,23.064111;113.081423,23.055881;113.082263,23.057844;113.082004,23.056745;113.082018,23.056124;113.082546,23.056758;113.082612,23.057023;113.081913,23.057131;113.081565,23.056114;113.081148,23.055803;113.081028,23.055874;113.080773,23.055864;113.080486,23.055833;113.08028,23.055815;113.080683,23.056043;113.080987,23.056078;113.080418,23.056064;113.080235,23.055997;113.081543,23.056759;113.080924,23.056714;113.080638,23.056687;113.080267,23.056671;113.077897,23.058947;113.077597,23.058757;113.077284,23.059028;113.078238,23.059124;113.078327,23.059207;113.07843,23.059223;113.078663,23.059075;113.078614,23.058827;113.078606,23.058692;113.078619,23.058574;113.078592,23.058385;113.078596,23.058291;113.078641,23.058149;113.037728,23.075946;113.07847,23.05847;113.077706,23.057034;113.077553,23.056904;113.076935,23.056846;113.076263,23.058096;113.076769,23.058858;113.076756,23.058671;113.076756,23.058989;113.078627,23.057963;113.078497,23.057851;113.078314,23.057958;113.078265,23.057805;113.078619,23.057557;113.078977,23.057306;113.078239,23.057375;113.0778,23.05732;113.077809,23.057717;113.077778,23.057574;113.077966,23.057679;113.078011,23.05757;113.0782,23.057583;113.078379,23.057031;113.078259,23.056994;113.078142,23.056994;113.07807,23.057059;113.071579,23.053371;113.071302,23.053285;113.070603,23.053361;113.082214,23.050385;113.082388,23.050835;113.081712,23.050937;113.081201,23.050948;113.080928,23.050963;113.081407,23.050947;113.080198,23.051131;113.077856,23.051491;113.076222,23.051574;113.074553,23.05146;113.070099,23.051717;113.068112,23.052469;113.079925,23.051213;113.0797,23.051232;113.07945,23.051298;113.068094,23.05797;113.068009,23.05773;113.093261,23.069926;113.093522,23.069883;113.093549,23.069695;113.093549,23.069514;113.094545,23.070007;113.094554,23.070192;113.093607,23.0691;113.093634,23.06883;113.093616,23.068741;113.093625,23.068627;113.094158,23.068778;113.0941,23.068585;113.093683,23.07013;113.093795,23.069717;113.093808,23.069545;113.093862,23.069406;113.094018,23.069634;113.094117,23.070165;113.094252,23.06961;113.093651,23.068134;113.093673,23.068003;113.093686,23.067828;113.093752,23.067646;113.093734,23.067532;113.093703,23.067401;113.093672,23.067257;113.093138,23.06635;113.09312,23.066128;113.093008,23.066291;113.092873,23.066297;113.092729,23.066273;113.092573,23.066237;113.092245,23.066365;113.09172,23.065591;113.091509,23.065504;113.091348,23.06538;113.09341,23.067902;113.093464,23.067796;113.093473,23.067786;113.093437,23.067584;113.093397,23.06749;113.09341,23.067372;113.093437,23.067254;113.093392,23.067165;113.077901,23.088662;113.057999,23.059666;113.068535,23.061831;113.07869,23.071595;113.082587,23.085099;113.022409,23.109031;113.029441,23.103907;113.014526,23.084058;113.038843,23.0905;113.012625,23.072038;112.485223,23.055046;112.485343,23.058649",

    },
    onLoad: function () {
        this.mapCtx = wx.createMapContext('mapId')
    },

    addMarkers() {
        let that = this;
        if(that.data.jishu > 500){
            wx.showToast({
                title: '按钮无效,按移除',
            })
            return;
        }
        let zuobiao = that.data.zuobiao.split(";");
        wx.showLoading({
            title: '正在加载',
        })
        let count = that.data.count
        let markers = []
        for (var i = 0; i < zuobiao.length; i++) {
            if(i >= count && i < (count + that.data.jishu)){
                let jw = zuobiao[i].split(",");
                let newMarker = {
                    id: Number(i),
                    latitude: Number(jw[1]),
                    longitude: Number(jw[0]),
                    iconPath: img,
                    width: 50,
                    height: 50,
                    joinCluster: true,
                    callout :  {
                        content: '111',
                        display: 'ALWAYS',
                    }
                }
                markers.push(newMarker)
            }
        }

        that.mapCtx.addMarkers({
            markers,
            clear: false,
            success(res) {
                that.setData({
                    count: that.data.count + that.data.jishu,
                    jishu: that.data.jishu + 100
                })
                wx.hideLoading()
                console.log('addMarkers', res)
            }
        })
    },

    removeMarkers() {
        let that = this;
        this.mapCtx.addMarkers({
            clear: true,
            markers: [],
            success(res) {
                that.setData({
                    count: 0,
                    jishu: 100
                })
                console.log('delMarkers', res)
            }
        })
    },
})
