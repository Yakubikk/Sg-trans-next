// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cistern_models.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$RailwayCisternDetailDTOImpl _$$RailwayCisternDetailDTOImplFromJson(
  Map<String, dynamic> json,
) => _$RailwayCisternDetailDTOImpl(
  id: json['id'] as String,
  number: json['number'] as String,
  manufacturer: Manufacturer.fromJson(
    json['manufacturer'] as Map<String, dynamic>,
  ),
  buildDate: json['buildDate'] as String,
  tareWeight: (json['tareWeight'] as num).toDouble(),
  loadCapacity: (json['loadCapacity'] as num).toDouble(),
  length: (json['length'] as num).toDouble(),
  axleCount: (json['axleCount'] as num).toInt(),
  volume: (json['volume'] as num).toDouble(),
  fillingVolume: (json['fillingVolume'] as num?)?.toDouble(),
  initialTareWeight: (json['initialTareWeight'] as num?)?.toDouble(),
  type: WagonType.fromJson(json['type'] as Map<String, dynamic>),
  model: json['model'] == null
      ? null
      : WagonModel.fromJson(json['model'] as Map<String, dynamic>),
  commissioningDate: json['commissioningDate'] as String?,
  serialNumber: json['serialNumber'] as String,
  registrationNumber: json['registrationNumber'] as String,
  registrationDate: json['registrationDate'] as String,
  registrar: json['registrar'] == null
      ? null
      : Registrar.fromJson(json['registrar'] as Map<String, dynamic>),
  notes: json['notes'] as String,
  owner: json['owner'] == null
      ? null
      : Owner.fromJson(json['owner'] as Map<String, dynamic>),
  techConditions: json['techConditions'] as String?,
  pripiska: json['pripiska'] as String?,
  reRegistrationDate: json['reRegistrationDate'] as String?,
  pressure: (json['pressure'] as num).toDouble(),
  testPressure: (json['testPressure'] as num).toDouble(),
  rent: json['rent'] as String?,
  affiliation: Affiliation.fromJson(
    json['affiliation'] as Map<String, dynamic>,
  ),
  serviceLifeYears: (json['serviceLifeYears'] as num).toInt(),
  periodMajorRepair: json['periodMajorRepair'] as String?,
  periodPeriodicTest: json['periodPeriodicTest'] as String?,
  periodIntermediateTest: json['periodIntermediateTest'] as String?,
  periodDepotRepair: json['periodDepotRepair'] as String?,
  dangerClass: (json['dangerClass'] as num).toInt(),
  substance: json['substance'] as String,
  tareWeight2: (json['tareWeight2'] as num).toDouble(),
  tareWeight3: (json['tareWeight3'] as num).toDouble(),
  createdAt: DateTime.parse(json['createdAt'] as String),
  updatedAt: DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$$RailwayCisternDetailDTOImplToJson(
  _$RailwayCisternDetailDTOImpl instance,
) => <String, dynamic>{
  'id': instance.id,
  'number': instance.number,
  'manufacturer': instance.manufacturer,
  'buildDate': instance.buildDate,
  'tareWeight': instance.tareWeight,
  'loadCapacity': instance.loadCapacity,
  'length': instance.length,
  'axleCount': instance.axleCount,
  'volume': instance.volume,
  'fillingVolume': instance.fillingVolume,
  'initialTareWeight': instance.initialTareWeight,
  'type': instance.type,
  'model': instance.model,
  'commissioningDate': instance.commissioningDate,
  'serialNumber': instance.serialNumber,
  'registrationNumber': instance.registrationNumber,
  'registrationDate': instance.registrationDate,
  'registrar': instance.registrar,
  'notes': instance.notes,
  'owner': instance.owner,
  'techConditions': instance.techConditions,
  'pripiska': instance.pripiska,
  'reRegistrationDate': instance.reRegistrationDate,
  'pressure': instance.pressure,
  'testPressure': instance.testPressure,
  'rent': instance.rent,
  'affiliation': instance.affiliation,
  'serviceLifeYears': instance.serviceLifeYears,
  'periodMajorRepair': instance.periodMajorRepair,
  'periodPeriodicTest': instance.periodPeriodicTest,
  'periodIntermediateTest': instance.periodIntermediateTest,
  'periodDepotRepair': instance.periodDepotRepair,
  'dangerClass': instance.dangerClass,
  'substance': instance.substance,
  'tareWeight2': instance.tareWeight2,
  'tareWeight3': instance.tareWeight3,
  'createdAt': instance.createdAt.toIso8601String(),
  'updatedAt': instance.updatedAt.toIso8601String(),
};

_$ManufacturerImpl _$$ManufacturerImplFromJson(Map<String, dynamic> json) =>
    _$ManufacturerImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      country: json['country'] as String?,
      shortName: json['shortName'] as String?,
      code: json['code'] as String?,
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
      updatedAt: json['updatedAt'] == null
          ? null
          : DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$$ManufacturerImplToJson(_$ManufacturerImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'country': instance.country,
      'shortName': instance.shortName,
      'code': instance.code,
      'createdAt': instance.createdAt?.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
    };

_$WagonTypeImpl _$$WagonTypeImplFromJson(Map<String, dynamic> json) =>
    _$WagonTypeImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      type: json['type'] as String?,
    );

Map<String, dynamic> _$$WagonTypeImplToJson(_$WagonTypeImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'type': instance.type,
    };

_$WagonModelImpl _$$WagonModelImplFromJson(Map<String, dynamic> json) =>
    _$WagonModelImpl(id: json['id'] as String, name: json['name'] as String);

Map<String, dynamic> _$$WagonModelImplToJson(_$WagonModelImpl instance) =>
    <String, dynamic>{'id': instance.id, 'name': instance.name};

_$RegistrarImpl _$$RegistrarImplFromJson(Map<String, dynamic> json) =>
    _$RegistrarImpl(id: json['id'] as String, name: json['name'] as String);

Map<String, dynamic> _$$RegistrarImplToJson(_$RegistrarImpl instance) =>
    <String, dynamic>{'id': instance.id, 'name': instance.name};

_$OwnerImpl _$$OwnerImplFromJson(Map<String, dynamic> json) => _$OwnerImpl(
  id: json['id'] as String,
  name: json['name'] as String,
  unp: json['unp'] as String?,
  shortName: json['shortName'] as String?,
  address: json['address'] as String?,
  treatRepairs: json['treatRepairs'] as bool?,
  createdAt: json['createdAt'] == null
      ? null
      : DateTime.parse(json['createdAt'] as String),
  updatedAt: json['updatedAt'] == null
      ? null
      : DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$$OwnerImplToJson(_$OwnerImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'unp': instance.unp,
      'shortName': instance.shortName,
      'address': instance.address,
      'treatRepairs': instance.treatRepairs,
      'createdAt': instance.createdAt?.toIso8601String(),
      'updatedAt': instance.updatedAt?.toIso8601String(),
    };

_$AffiliationImpl _$$AffiliationImplFromJson(Map<String, dynamic> json) =>
    _$AffiliationImpl(id: json['id'] as String, value: json['value'] as String);

Map<String, dynamic> _$$AffiliationImplToJson(_$AffiliationImpl instance) =>
    <String, dynamic>{'id': instance.id, 'value': instance.value};

_$RailwayCisternListDTOImpl _$$RailwayCisternListDTOImplFromJson(
  Map<String, dynamic> json,
) => _$RailwayCisternListDTOImpl(
  id: json['id'] as String,
  number: json['number'] as String,
  manufacturerName: json['manufacturerName'] as String,
  buildDate: json['buildDate'] as String,
  typeName: json['typeName'] as String,
  modelName: json['modelName'] as String,
  ownerName: json['ownerName'] as String,
  registrationNumber: json['registrationNumber'] as String,
  registrationDate: json['registrationDate'] as String,
  affiliationValue: json['affiliationValue'] as String,
);

Map<String, dynamic> _$$RailwayCisternListDTOImplToJson(
  _$RailwayCisternListDTOImpl instance,
) => <String, dynamic>{
  'id': instance.id,
  'number': instance.number,
  'manufacturerName': instance.manufacturerName,
  'buildDate': instance.buildDate,
  'typeName': instance.typeName,
  'modelName': instance.modelName,
  'ownerName': instance.ownerName,
  'registrationNumber': instance.registrationNumber,
  'registrationDate': instance.registrationDate,
  'affiliationValue': instance.affiliationValue,
};

_$CreateRailwayCisternDTOImpl _$$CreateRailwayCisternDTOImplFromJson(
  Map<String, dynamic> json,
) => _$CreateRailwayCisternDTOImpl(
  number: json['number'] as String,
  manufacturerId: json['manufacturerId'] as String,
  buildDate: json['buildDate'] as String,
  tareWeight: (json['tareWeight'] as num).toDouble(),
  loadCapacity: (json['loadCapacity'] as num).toDouble(),
  length: (json['length'] as num).toDouble(),
  axleCount: (json['axleCount'] as num).toInt(),
  volume: (json['volume'] as num).toDouble(),
  fillingVolume: (json['fillingVolume'] as num?)?.toDouble(),
  initialTareWeight: (json['initialTareWeight'] as num?)?.toDouble(),
  typeId: json['typeId'] as String,
  modelId: json['modelId'] as String?,
  commissioningDate: json['commissioningDate'] as String?,
  serialNumber: json['serialNumber'] as String,
  registrationNumber: json['registrationNumber'] as String,
  registrationDate: json['registrationDate'] as String,
  registrarId: json['registrarId'] as String?,
  notes: json['notes'] as String,
  ownerId: json['ownerId'] as String?,
  techConditions: json['techConditions'] as String?,
  pripiska: json['pripiska'] as String?,
  reRegistrationDate: json['reRegistrationDate'] as String?,
  pressure: (json['pressure'] as num).toDouble(),
  testPressure: (json['testPressure'] as num).toDouble(),
  rent: json['rent'] as String?,
  affiliationId: json['affiliationId'] as String,
  serviceLifeYears: (json['serviceLifeYears'] as num).toInt(),
  periodMajorRepair: json['periodMajorRepair'] as String?,
  periodPeriodicTest: json['periodPeriodicTest'] as String?,
  periodIntermediateTest: json['periodIntermediateTest'] as String?,
  periodDepotRepair: json['periodDepotRepair'] as String?,
  dangerClass: (json['dangerClass'] as num).toInt(),
  substance: json['substance'] as String,
  tareWeight2: (json['tareWeight2'] as num).toDouble(),
  tareWeight3: (json['tareWeight3'] as num).toDouble(),
);

Map<String, dynamic> _$$CreateRailwayCisternDTOImplToJson(
  _$CreateRailwayCisternDTOImpl instance,
) => <String, dynamic>{
  'number': instance.number,
  'manufacturerId': instance.manufacturerId,
  'buildDate': instance.buildDate,
  'tareWeight': instance.tareWeight,
  'loadCapacity': instance.loadCapacity,
  'length': instance.length,
  'axleCount': instance.axleCount,
  'volume': instance.volume,
  'fillingVolume': instance.fillingVolume,
  'initialTareWeight': instance.initialTareWeight,
  'typeId': instance.typeId,
  'modelId': instance.modelId,
  'commissioningDate': instance.commissioningDate,
  'serialNumber': instance.serialNumber,
  'registrationNumber': instance.registrationNumber,
  'registrationDate': instance.registrationDate,
  'registrarId': instance.registrarId,
  'notes': instance.notes,
  'ownerId': instance.ownerId,
  'techConditions': instance.techConditions,
  'pripiska': instance.pripiska,
  'reRegistrationDate': instance.reRegistrationDate,
  'pressure': instance.pressure,
  'testPressure': instance.testPressure,
  'rent': instance.rent,
  'affiliationId': instance.affiliationId,
  'serviceLifeYears': instance.serviceLifeYears,
  'periodMajorRepair': instance.periodMajorRepair,
  'periodPeriodicTest': instance.periodPeriodicTest,
  'periodIntermediateTest': instance.periodIntermediateTest,
  'periodDepotRepair': instance.periodDepotRepair,
  'dangerClass': instance.dangerClass,
  'substance': instance.substance,
  'tareWeight2': instance.tareWeight2,
  'tareWeight3': instance.tareWeight3,
};

_$UpdateRailwayCisternDTOImpl _$$UpdateRailwayCisternDTOImplFromJson(
  Map<String, dynamic> json,
) => _$UpdateRailwayCisternDTOImpl(
  id: json['id'] as String,
  number: json['number'] as String,
  manufacturerId: json['manufacturerId'] as String,
  buildDate: json['buildDate'] as String,
  tareWeight: (json['tareWeight'] as num).toDouble(),
  loadCapacity: (json['loadCapacity'] as num).toDouble(),
  length: (json['length'] as num).toDouble(),
  axleCount: (json['axleCount'] as num).toInt(),
  volume: (json['volume'] as num).toDouble(),
  fillingVolume: (json['fillingVolume'] as num?)?.toDouble(),
  initialTareWeight: (json['initialTareWeight'] as num?)?.toDouble(),
  typeId: json['typeId'] as String,
  modelId: json['modelId'] as String?,
  commissioningDate: json['commissioningDate'] as String?,
  serialNumber: json['serialNumber'] as String,
  registrationNumber: json['registrationNumber'] as String,
  registrationDate: json['registrationDate'] as String,
  registrarId: json['registrarId'] as String?,
  notes: json['notes'] as String,
  ownerId: json['ownerId'] as String?,
  techConditions: json['techConditions'] as String?,
  pripiska: json['pripiska'] as String?,
  reRegistrationDate: json['reRegistrationDate'] as String?,
  pressure: (json['pressure'] as num).toDouble(),
  testPressure: (json['testPressure'] as num).toDouble(),
  rent: json['rent'] as String?,
  affiliationId: json['affiliationId'] as String,
  serviceLifeYears: (json['serviceLifeYears'] as num).toInt(),
  periodMajorRepair: json['periodMajorRepair'] as String?,
  periodPeriodicTest: json['periodPeriodicTest'] as String?,
  periodIntermediateTest: json['periodIntermediateTest'] as String?,
  periodDepotRepair: json['periodDepotRepair'] as String?,
  dangerClass: (json['dangerClass'] as num).toInt(),
  substance: json['substance'] as String,
  tareWeight2: (json['tareWeight2'] as num).toDouble(),
  tareWeight3: (json['tareWeight3'] as num).toDouble(),
);

Map<String, dynamic> _$$UpdateRailwayCisternDTOImplToJson(
  _$UpdateRailwayCisternDTOImpl instance,
) => <String, dynamic>{
  'id': instance.id,
  'number': instance.number,
  'manufacturerId': instance.manufacturerId,
  'buildDate': instance.buildDate,
  'tareWeight': instance.tareWeight,
  'loadCapacity': instance.loadCapacity,
  'length': instance.length,
  'axleCount': instance.axleCount,
  'volume': instance.volume,
  'fillingVolume': instance.fillingVolume,
  'initialTareWeight': instance.initialTareWeight,
  'typeId': instance.typeId,
  'modelId': instance.modelId,
  'commissioningDate': instance.commissioningDate,
  'serialNumber': instance.serialNumber,
  'registrationNumber': instance.registrationNumber,
  'registrationDate': instance.registrationDate,
  'registrarId': instance.registrarId,
  'notes': instance.notes,
  'ownerId': instance.ownerId,
  'techConditions': instance.techConditions,
  'pripiska': instance.pripiska,
  'reRegistrationDate': instance.reRegistrationDate,
  'pressure': instance.pressure,
  'testPressure': instance.testPressure,
  'rent': instance.rent,
  'affiliationId': instance.affiliationId,
  'serviceLifeYears': instance.serviceLifeYears,
  'periodMajorRepair': instance.periodMajorRepair,
  'periodPeriodicTest': instance.periodPeriodicTest,
  'periodIntermediateTest': instance.periodIntermediateTest,
  'periodDepotRepair': instance.periodDepotRepair,
  'dangerClass': instance.dangerClass,
  'substance': instance.substance,
  'tareWeight2': instance.tareWeight2,
  'tareWeight3': instance.tareWeight3,
};

_$CisternsFilterImpl _$$CisternsFilterImplFromJson(Map<String, dynamic> json) =>
    _$CisternsFilterImpl(
      search: json['search'] as String?,
      manufacturerId: json['manufacturerId'] as String?,
      typeId: json['typeId'] as String?,
      ownerId: json['ownerId'] as String?,
      affiliationId: json['affiliationId'] as String?,
      page: (json['page'] as num?)?.toInt(),
      pageSize: (json['pageSize'] as num?)?.toInt(),
    );

Map<String, dynamic> _$$CisternsFilterImplToJson(
  _$CisternsFilterImpl instance,
) => <String, dynamic>{
  'search': instance.search,
  'manufacturerId': instance.manufacturerId,
  'typeId': instance.typeId,
  'ownerId': instance.ownerId,
  'affiliationId': instance.affiliationId,
  'page': instance.page,
  'pageSize': instance.pageSize,
};

_$PaginatedCisternsResponseImpl _$$PaginatedCisternsResponseImplFromJson(
  Map<String, dynamic> json,
) => _$PaginatedCisternsResponseImpl(
  railwayCisterns: (json['railwayCisterns'] as List<dynamic>)
      .map((e) => RailwayCisternDetailDTO.fromJson(e as Map<String, dynamic>))
      .toList(),
  totalCount: (json['totalCount'] as num).toInt(),
  currentPage: (json['currentPage'] as num).toInt(),
  pageSize: (json['pageSize'] as num).toInt(),
  totalPages: (json['totalPages'] as num).toInt(),
);

Map<String, dynamic> _$$PaginatedCisternsResponseImplToJson(
  _$PaginatedCisternsResponseImpl instance,
) => <String, dynamic>{
  'railwayCisterns': instance.railwayCisterns,
  'totalCount': instance.totalCount,
  'currentPage': instance.currentPage,
  'pageSize': instance.pageSize,
  'totalPages': instance.totalPages,
};
