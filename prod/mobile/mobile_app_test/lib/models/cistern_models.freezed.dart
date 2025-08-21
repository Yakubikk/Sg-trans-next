// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'cistern_models.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
  'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models',
);

RailwayCisternDetailDTO _$RailwayCisternDetailDTOFromJson(
  Map<String, dynamic> json,
) {
  return _RailwayCisternDetailDTO.fromJson(json);
}

/// @nodoc
mixin _$RailwayCisternDetailDTO {
  String get id => throw _privateConstructorUsedError;
  String get number => throw _privateConstructorUsedError;
  Manufacturer get manufacturer => throw _privateConstructorUsedError;
  String get buildDate => throw _privateConstructorUsedError;
  double get tareWeight => throw _privateConstructorUsedError;
  double get loadCapacity => throw _privateConstructorUsedError;
  double get length => throw _privateConstructorUsedError;
  int get axleCount => throw _privateConstructorUsedError;
  double get volume => throw _privateConstructorUsedError;
  double? get fillingVolume => throw _privateConstructorUsedError;
  double? get initialTareWeight => throw _privateConstructorUsedError;
  WagonType get type => throw _privateConstructorUsedError;
  WagonModel? get model => throw _privateConstructorUsedError;
  String? get commissioningDate => throw _privateConstructorUsedError;
  String get serialNumber => throw _privateConstructorUsedError;
  String get registrationNumber => throw _privateConstructorUsedError;
  String get registrationDate => throw _privateConstructorUsedError;
  Registrar? get registrar => throw _privateConstructorUsedError;
  String get notes => throw _privateConstructorUsedError;
  Owner? get owner => throw _privateConstructorUsedError;
  String? get techConditions => throw _privateConstructorUsedError;
  String? get pripiska => throw _privateConstructorUsedError;
  String? get reRegistrationDate => throw _privateConstructorUsedError;
  double get pressure => throw _privateConstructorUsedError;
  double get testPressure => throw _privateConstructorUsedError;
  String? get rent => throw _privateConstructorUsedError;
  Affiliation get affiliation => throw _privateConstructorUsedError;
  int get serviceLifeYears => throw _privateConstructorUsedError;
  String? get periodMajorRepair => throw _privateConstructorUsedError;
  String? get periodPeriodicTest => throw _privateConstructorUsedError;
  String? get periodIntermediateTest => throw _privateConstructorUsedError;
  String? get periodDepotRepair => throw _privateConstructorUsedError;
  int get dangerClass => throw _privateConstructorUsedError;
  String get substance => throw _privateConstructorUsedError;
  double get tareWeight2 => throw _privateConstructorUsedError;
  double get tareWeight3 => throw _privateConstructorUsedError;
  DateTime get createdAt => throw _privateConstructorUsedError;
  DateTime get updatedAt => throw _privateConstructorUsedError;

  /// Serializes this RailwayCisternDetailDTO to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RailwayCisternDetailDTOCopyWith<RailwayCisternDetailDTO> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RailwayCisternDetailDTOCopyWith<$Res> {
  factory $RailwayCisternDetailDTOCopyWith(
    RailwayCisternDetailDTO value,
    $Res Function(RailwayCisternDetailDTO) then,
  ) = _$RailwayCisternDetailDTOCopyWithImpl<$Res, RailwayCisternDetailDTO>;
  @useResult
  $Res call({
    String id,
    String number,
    Manufacturer manufacturer,
    String buildDate,
    double tareWeight,
    double loadCapacity,
    double length,
    int axleCount,
    double volume,
    double? fillingVolume,
    double? initialTareWeight,
    WagonType type,
    WagonModel? model,
    String? commissioningDate,
    String serialNumber,
    String registrationNumber,
    String registrationDate,
    Registrar? registrar,
    String notes,
    Owner? owner,
    String? techConditions,
    String? pripiska,
    String? reRegistrationDate,
    double pressure,
    double testPressure,
    String? rent,
    Affiliation affiliation,
    int serviceLifeYears,
    String? periodMajorRepair,
    String? periodPeriodicTest,
    String? periodIntermediateTest,
    String? periodDepotRepair,
    int dangerClass,
    String substance,
    double tareWeight2,
    double tareWeight3,
    DateTime createdAt,
    DateTime updatedAt,
  });

  $ManufacturerCopyWith<$Res> get manufacturer;
  $WagonTypeCopyWith<$Res> get type;
  $WagonModelCopyWith<$Res>? get model;
  $RegistrarCopyWith<$Res>? get registrar;
  $OwnerCopyWith<$Res>? get owner;
  $AffiliationCopyWith<$Res> get affiliation;
}

/// @nodoc
class _$RailwayCisternDetailDTOCopyWithImpl<
  $Res,
  $Val extends RailwayCisternDetailDTO
>
    implements $RailwayCisternDetailDTOCopyWith<$Res> {
  _$RailwayCisternDetailDTOCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? number = null,
    Object? manufacturer = null,
    Object? buildDate = null,
    Object? tareWeight = null,
    Object? loadCapacity = null,
    Object? length = null,
    Object? axleCount = null,
    Object? volume = null,
    Object? fillingVolume = freezed,
    Object? initialTareWeight = freezed,
    Object? type = null,
    Object? model = freezed,
    Object? commissioningDate = freezed,
    Object? serialNumber = null,
    Object? registrationNumber = null,
    Object? registrationDate = null,
    Object? registrar = freezed,
    Object? notes = null,
    Object? owner = freezed,
    Object? techConditions = freezed,
    Object? pripiska = freezed,
    Object? reRegistrationDate = freezed,
    Object? pressure = null,
    Object? testPressure = null,
    Object? rent = freezed,
    Object? affiliation = null,
    Object? serviceLifeYears = null,
    Object? periodMajorRepair = freezed,
    Object? periodPeriodicTest = freezed,
    Object? periodIntermediateTest = freezed,
    Object? periodDepotRepair = freezed,
    Object? dangerClass = null,
    Object? substance = null,
    Object? tareWeight2 = null,
    Object? tareWeight3 = null,
    Object? createdAt = null,
    Object? updatedAt = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            number: null == number
                ? _value.number
                : number // ignore: cast_nullable_to_non_nullable
                      as String,
            manufacturer: null == manufacturer
                ? _value.manufacturer
                : manufacturer // ignore: cast_nullable_to_non_nullable
                      as Manufacturer,
            buildDate: null == buildDate
                ? _value.buildDate
                : buildDate // ignore: cast_nullable_to_non_nullable
                      as String,
            tareWeight: null == tareWeight
                ? _value.tareWeight
                : tareWeight // ignore: cast_nullable_to_non_nullable
                      as double,
            loadCapacity: null == loadCapacity
                ? _value.loadCapacity
                : loadCapacity // ignore: cast_nullable_to_non_nullable
                      as double,
            length: null == length
                ? _value.length
                : length // ignore: cast_nullable_to_non_nullable
                      as double,
            axleCount: null == axleCount
                ? _value.axleCount
                : axleCount // ignore: cast_nullable_to_non_nullable
                      as int,
            volume: null == volume
                ? _value.volume
                : volume // ignore: cast_nullable_to_non_nullable
                      as double,
            fillingVolume: freezed == fillingVolume
                ? _value.fillingVolume
                : fillingVolume // ignore: cast_nullable_to_non_nullable
                      as double?,
            initialTareWeight: freezed == initialTareWeight
                ? _value.initialTareWeight
                : initialTareWeight // ignore: cast_nullable_to_non_nullable
                      as double?,
            type: null == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as WagonType,
            model: freezed == model
                ? _value.model
                : model // ignore: cast_nullable_to_non_nullable
                      as WagonModel?,
            commissioningDate: freezed == commissioningDate
                ? _value.commissioningDate
                : commissioningDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            serialNumber: null == serialNumber
                ? _value.serialNumber
                : serialNumber // ignore: cast_nullable_to_non_nullable
                      as String,
            registrationNumber: null == registrationNumber
                ? _value.registrationNumber
                : registrationNumber // ignore: cast_nullable_to_non_nullable
                      as String,
            registrationDate: null == registrationDate
                ? _value.registrationDate
                : registrationDate // ignore: cast_nullable_to_non_nullable
                      as String,
            registrar: freezed == registrar
                ? _value.registrar
                : registrar // ignore: cast_nullable_to_non_nullable
                      as Registrar?,
            notes: null == notes
                ? _value.notes
                : notes // ignore: cast_nullable_to_non_nullable
                      as String,
            owner: freezed == owner
                ? _value.owner
                : owner // ignore: cast_nullable_to_non_nullable
                      as Owner?,
            techConditions: freezed == techConditions
                ? _value.techConditions
                : techConditions // ignore: cast_nullable_to_non_nullable
                      as String?,
            pripiska: freezed == pripiska
                ? _value.pripiska
                : pripiska // ignore: cast_nullable_to_non_nullable
                      as String?,
            reRegistrationDate: freezed == reRegistrationDate
                ? _value.reRegistrationDate
                : reRegistrationDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            pressure: null == pressure
                ? _value.pressure
                : pressure // ignore: cast_nullable_to_non_nullable
                      as double,
            testPressure: null == testPressure
                ? _value.testPressure
                : testPressure // ignore: cast_nullable_to_non_nullable
                      as double,
            rent: freezed == rent
                ? _value.rent
                : rent // ignore: cast_nullable_to_non_nullable
                      as String?,
            affiliation: null == affiliation
                ? _value.affiliation
                : affiliation // ignore: cast_nullable_to_non_nullable
                      as Affiliation,
            serviceLifeYears: null == serviceLifeYears
                ? _value.serviceLifeYears
                : serviceLifeYears // ignore: cast_nullable_to_non_nullable
                      as int,
            periodMajorRepair: freezed == periodMajorRepair
                ? _value.periodMajorRepair
                : periodMajorRepair // ignore: cast_nullable_to_non_nullable
                      as String?,
            periodPeriodicTest: freezed == periodPeriodicTest
                ? _value.periodPeriodicTest
                : periodPeriodicTest // ignore: cast_nullable_to_non_nullable
                      as String?,
            periodIntermediateTest: freezed == periodIntermediateTest
                ? _value.periodIntermediateTest
                : periodIntermediateTest // ignore: cast_nullable_to_non_nullable
                      as String?,
            periodDepotRepair: freezed == periodDepotRepair
                ? _value.periodDepotRepair
                : periodDepotRepair // ignore: cast_nullable_to_non_nullable
                      as String?,
            dangerClass: null == dangerClass
                ? _value.dangerClass
                : dangerClass // ignore: cast_nullable_to_non_nullable
                      as int,
            substance: null == substance
                ? _value.substance
                : substance // ignore: cast_nullable_to_non_nullable
                      as String,
            tareWeight2: null == tareWeight2
                ? _value.tareWeight2
                : tareWeight2 // ignore: cast_nullable_to_non_nullable
                      as double,
            tareWeight3: null == tareWeight3
                ? _value.tareWeight3
                : tareWeight3 // ignore: cast_nullable_to_non_nullable
                      as double,
            createdAt: null == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as DateTime,
            updatedAt: null == updatedAt
                ? _value.updatedAt
                : updatedAt // ignore: cast_nullable_to_non_nullable
                      as DateTime,
          )
          as $Val,
    );
  }

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $ManufacturerCopyWith<$Res> get manufacturer {
    return $ManufacturerCopyWith<$Res>(_value.manufacturer, (value) {
      return _then(_value.copyWith(manufacturer: value) as $Val);
    });
  }

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $WagonTypeCopyWith<$Res> get type {
    return $WagonTypeCopyWith<$Res>(_value.type, (value) {
      return _then(_value.copyWith(type: value) as $Val);
    });
  }

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $WagonModelCopyWith<$Res>? get model {
    if (_value.model == null) {
      return null;
    }

    return $WagonModelCopyWith<$Res>(_value.model!, (value) {
      return _then(_value.copyWith(model: value) as $Val);
    });
  }

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $RegistrarCopyWith<$Res>? get registrar {
    if (_value.registrar == null) {
      return null;
    }

    return $RegistrarCopyWith<$Res>(_value.registrar!, (value) {
      return _then(_value.copyWith(registrar: value) as $Val);
    });
  }

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $OwnerCopyWith<$Res>? get owner {
    if (_value.owner == null) {
      return null;
    }

    return $OwnerCopyWith<$Res>(_value.owner!, (value) {
      return _then(_value.copyWith(owner: value) as $Val);
    });
  }

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $AffiliationCopyWith<$Res> get affiliation {
    return $AffiliationCopyWith<$Res>(_value.affiliation, (value) {
      return _then(_value.copyWith(affiliation: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$RailwayCisternDetailDTOImplCopyWith<$Res>
    implements $RailwayCisternDetailDTOCopyWith<$Res> {
  factory _$$RailwayCisternDetailDTOImplCopyWith(
    _$RailwayCisternDetailDTOImpl value,
    $Res Function(_$RailwayCisternDetailDTOImpl) then,
  ) = __$$RailwayCisternDetailDTOImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String number,
    Manufacturer manufacturer,
    String buildDate,
    double tareWeight,
    double loadCapacity,
    double length,
    int axleCount,
    double volume,
    double? fillingVolume,
    double? initialTareWeight,
    WagonType type,
    WagonModel? model,
    String? commissioningDate,
    String serialNumber,
    String registrationNumber,
    String registrationDate,
    Registrar? registrar,
    String notes,
    Owner? owner,
    String? techConditions,
    String? pripiska,
    String? reRegistrationDate,
    double pressure,
    double testPressure,
    String? rent,
    Affiliation affiliation,
    int serviceLifeYears,
    String? periodMajorRepair,
    String? periodPeriodicTest,
    String? periodIntermediateTest,
    String? periodDepotRepair,
    int dangerClass,
    String substance,
    double tareWeight2,
    double tareWeight3,
    DateTime createdAt,
    DateTime updatedAt,
  });

  @override
  $ManufacturerCopyWith<$Res> get manufacturer;
  @override
  $WagonTypeCopyWith<$Res> get type;
  @override
  $WagonModelCopyWith<$Res>? get model;
  @override
  $RegistrarCopyWith<$Res>? get registrar;
  @override
  $OwnerCopyWith<$Res>? get owner;
  @override
  $AffiliationCopyWith<$Res> get affiliation;
}

/// @nodoc
class __$$RailwayCisternDetailDTOImplCopyWithImpl<$Res>
    extends
        _$RailwayCisternDetailDTOCopyWithImpl<
          $Res,
          _$RailwayCisternDetailDTOImpl
        >
    implements _$$RailwayCisternDetailDTOImplCopyWith<$Res> {
  __$$RailwayCisternDetailDTOImplCopyWithImpl(
    _$RailwayCisternDetailDTOImpl _value,
    $Res Function(_$RailwayCisternDetailDTOImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? number = null,
    Object? manufacturer = null,
    Object? buildDate = null,
    Object? tareWeight = null,
    Object? loadCapacity = null,
    Object? length = null,
    Object? axleCount = null,
    Object? volume = null,
    Object? fillingVolume = freezed,
    Object? initialTareWeight = freezed,
    Object? type = null,
    Object? model = freezed,
    Object? commissioningDate = freezed,
    Object? serialNumber = null,
    Object? registrationNumber = null,
    Object? registrationDate = null,
    Object? registrar = freezed,
    Object? notes = null,
    Object? owner = freezed,
    Object? techConditions = freezed,
    Object? pripiska = freezed,
    Object? reRegistrationDate = freezed,
    Object? pressure = null,
    Object? testPressure = null,
    Object? rent = freezed,
    Object? affiliation = null,
    Object? serviceLifeYears = null,
    Object? periodMajorRepair = freezed,
    Object? periodPeriodicTest = freezed,
    Object? periodIntermediateTest = freezed,
    Object? periodDepotRepair = freezed,
    Object? dangerClass = null,
    Object? substance = null,
    Object? tareWeight2 = null,
    Object? tareWeight3 = null,
    Object? createdAt = null,
    Object? updatedAt = null,
  }) {
    return _then(
      _$RailwayCisternDetailDTOImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        number: null == number
            ? _value.number
            : number // ignore: cast_nullable_to_non_nullable
                  as String,
        manufacturer: null == manufacturer
            ? _value.manufacturer
            : manufacturer // ignore: cast_nullable_to_non_nullable
                  as Manufacturer,
        buildDate: null == buildDate
            ? _value.buildDate
            : buildDate // ignore: cast_nullable_to_non_nullable
                  as String,
        tareWeight: null == tareWeight
            ? _value.tareWeight
            : tareWeight // ignore: cast_nullable_to_non_nullable
                  as double,
        loadCapacity: null == loadCapacity
            ? _value.loadCapacity
            : loadCapacity // ignore: cast_nullable_to_non_nullable
                  as double,
        length: null == length
            ? _value.length
            : length // ignore: cast_nullable_to_non_nullable
                  as double,
        axleCount: null == axleCount
            ? _value.axleCount
            : axleCount // ignore: cast_nullable_to_non_nullable
                  as int,
        volume: null == volume
            ? _value.volume
            : volume // ignore: cast_nullable_to_non_nullable
                  as double,
        fillingVolume: freezed == fillingVolume
            ? _value.fillingVolume
            : fillingVolume // ignore: cast_nullable_to_non_nullable
                  as double?,
        initialTareWeight: freezed == initialTareWeight
            ? _value.initialTareWeight
            : initialTareWeight // ignore: cast_nullable_to_non_nullable
                  as double?,
        type: null == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as WagonType,
        model: freezed == model
            ? _value.model
            : model // ignore: cast_nullable_to_non_nullable
                  as WagonModel?,
        commissioningDate: freezed == commissioningDate
            ? _value.commissioningDate
            : commissioningDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        serialNumber: null == serialNumber
            ? _value.serialNumber
            : serialNumber // ignore: cast_nullable_to_non_nullable
                  as String,
        registrationNumber: null == registrationNumber
            ? _value.registrationNumber
            : registrationNumber // ignore: cast_nullable_to_non_nullable
                  as String,
        registrationDate: null == registrationDate
            ? _value.registrationDate
            : registrationDate // ignore: cast_nullable_to_non_nullable
                  as String,
        registrar: freezed == registrar
            ? _value.registrar
            : registrar // ignore: cast_nullable_to_non_nullable
                  as Registrar?,
        notes: null == notes
            ? _value.notes
            : notes // ignore: cast_nullable_to_non_nullable
                  as String,
        owner: freezed == owner
            ? _value.owner
            : owner // ignore: cast_nullable_to_non_nullable
                  as Owner?,
        techConditions: freezed == techConditions
            ? _value.techConditions
            : techConditions // ignore: cast_nullable_to_non_nullable
                  as String?,
        pripiska: freezed == pripiska
            ? _value.pripiska
            : pripiska // ignore: cast_nullable_to_non_nullable
                  as String?,
        reRegistrationDate: freezed == reRegistrationDate
            ? _value.reRegistrationDate
            : reRegistrationDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        pressure: null == pressure
            ? _value.pressure
            : pressure // ignore: cast_nullable_to_non_nullable
                  as double,
        testPressure: null == testPressure
            ? _value.testPressure
            : testPressure // ignore: cast_nullable_to_non_nullable
                  as double,
        rent: freezed == rent
            ? _value.rent
            : rent // ignore: cast_nullable_to_non_nullable
                  as String?,
        affiliation: null == affiliation
            ? _value.affiliation
            : affiliation // ignore: cast_nullable_to_non_nullable
                  as Affiliation,
        serviceLifeYears: null == serviceLifeYears
            ? _value.serviceLifeYears
            : serviceLifeYears // ignore: cast_nullable_to_non_nullable
                  as int,
        periodMajorRepair: freezed == periodMajorRepair
            ? _value.periodMajorRepair
            : periodMajorRepair // ignore: cast_nullable_to_non_nullable
                  as String?,
        periodPeriodicTest: freezed == periodPeriodicTest
            ? _value.periodPeriodicTest
            : periodPeriodicTest // ignore: cast_nullable_to_non_nullable
                  as String?,
        periodIntermediateTest: freezed == periodIntermediateTest
            ? _value.periodIntermediateTest
            : periodIntermediateTest // ignore: cast_nullable_to_non_nullable
                  as String?,
        periodDepotRepair: freezed == periodDepotRepair
            ? _value.periodDepotRepair
            : periodDepotRepair // ignore: cast_nullable_to_non_nullable
                  as String?,
        dangerClass: null == dangerClass
            ? _value.dangerClass
            : dangerClass // ignore: cast_nullable_to_non_nullable
                  as int,
        substance: null == substance
            ? _value.substance
            : substance // ignore: cast_nullable_to_non_nullable
                  as String,
        tareWeight2: null == tareWeight2
            ? _value.tareWeight2
            : tareWeight2 // ignore: cast_nullable_to_non_nullable
                  as double,
        tareWeight3: null == tareWeight3
            ? _value.tareWeight3
            : tareWeight3 // ignore: cast_nullable_to_non_nullable
                  as double,
        createdAt: null == createdAt
            ? _value.createdAt
            : createdAt // ignore: cast_nullable_to_non_nullable
                  as DateTime,
        updatedAt: null == updatedAt
            ? _value.updatedAt
            : updatedAt // ignore: cast_nullable_to_non_nullable
                  as DateTime,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RailwayCisternDetailDTOImpl implements _RailwayCisternDetailDTO {
  const _$RailwayCisternDetailDTOImpl({
    required this.id,
    required this.number,
    required this.manufacturer,
    required this.buildDate,
    required this.tareWeight,
    required this.loadCapacity,
    required this.length,
    required this.axleCount,
    required this.volume,
    this.fillingVolume,
    this.initialTareWeight,
    required this.type,
    this.model,
    this.commissioningDate,
    required this.serialNumber,
    required this.registrationNumber,
    required this.registrationDate,
    this.registrar,
    required this.notes,
    this.owner,
    this.techConditions,
    this.pripiska,
    this.reRegistrationDate,
    required this.pressure,
    required this.testPressure,
    this.rent,
    required this.affiliation,
    required this.serviceLifeYears,
    this.periodMajorRepair,
    this.periodPeriodicTest,
    this.periodIntermediateTest,
    this.periodDepotRepair,
    required this.dangerClass,
    required this.substance,
    required this.tareWeight2,
    required this.tareWeight3,
    required this.createdAt,
    required this.updatedAt,
  });

  factory _$RailwayCisternDetailDTOImpl.fromJson(Map<String, dynamic> json) =>
      _$$RailwayCisternDetailDTOImplFromJson(json);

  @override
  final String id;
  @override
  final String number;
  @override
  final Manufacturer manufacturer;
  @override
  final String buildDate;
  @override
  final double tareWeight;
  @override
  final double loadCapacity;
  @override
  final double length;
  @override
  final int axleCount;
  @override
  final double volume;
  @override
  final double? fillingVolume;
  @override
  final double? initialTareWeight;
  @override
  final WagonType type;
  @override
  final WagonModel? model;
  @override
  final String? commissioningDate;
  @override
  final String serialNumber;
  @override
  final String registrationNumber;
  @override
  final String registrationDate;
  @override
  final Registrar? registrar;
  @override
  final String notes;
  @override
  final Owner? owner;
  @override
  final String? techConditions;
  @override
  final String? pripiska;
  @override
  final String? reRegistrationDate;
  @override
  final double pressure;
  @override
  final double testPressure;
  @override
  final String? rent;
  @override
  final Affiliation affiliation;
  @override
  final int serviceLifeYears;
  @override
  final String? periodMajorRepair;
  @override
  final String? periodPeriodicTest;
  @override
  final String? periodIntermediateTest;
  @override
  final String? periodDepotRepair;
  @override
  final int dangerClass;
  @override
  final String substance;
  @override
  final double tareWeight2;
  @override
  final double tareWeight3;
  @override
  final DateTime createdAt;
  @override
  final DateTime updatedAt;

  @override
  String toString() {
    return 'RailwayCisternDetailDTO(id: $id, number: $number, manufacturer: $manufacturer, buildDate: $buildDate, tareWeight: $tareWeight, loadCapacity: $loadCapacity, length: $length, axleCount: $axleCount, volume: $volume, fillingVolume: $fillingVolume, initialTareWeight: $initialTareWeight, type: $type, model: $model, commissioningDate: $commissioningDate, serialNumber: $serialNumber, registrationNumber: $registrationNumber, registrationDate: $registrationDate, registrar: $registrar, notes: $notes, owner: $owner, techConditions: $techConditions, pripiska: $pripiska, reRegistrationDate: $reRegistrationDate, pressure: $pressure, testPressure: $testPressure, rent: $rent, affiliation: $affiliation, serviceLifeYears: $serviceLifeYears, periodMajorRepair: $periodMajorRepair, periodPeriodicTest: $periodPeriodicTest, periodIntermediateTest: $periodIntermediateTest, periodDepotRepair: $periodDepotRepair, dangerClass: $dangerClass, substance: $substance, tareWeight2: $tareWeight2, tareWeight3: $tareWeight3, createdAt: $createdAt, updatedAt: $updatedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RailwayCisternDetailDTOImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.number, number) || other.number == number) &&
            (identical(other.manufacturer, manufacturer) ||
                other.manufacturer == manufacturer) &&
            (identical(other.buildDate, buildDate) ||
                other.buildDate == buildDate) &&
            (identical(other.tareWeight, tareWeight) ||
                other.tareWeight == tareWeight) &&
            (identical(other.loadCapacity, loadCapacity) ||
                other.loadCapacity == loadCapacity) &&
            (identical(other.length, length) || other.length == length) &&
            (identical(other.axleCount, axleCount) ||
                other.axleCount == axleCount) &&
            (identical(other.volume, volume) || other.volume == volume) &&
            (identical(other.fillingVolume, fillingVolume) ||
                other.fillingVolume == fillingVolume) &&
            (identical(other.initialTareWeight, initialTareWeight) ||
                other.initialTareWeight == initialTareWeight) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.model, model) || other.model == model) &&
            (identical(other.commissioningDate, commissioningDate) ||
                other.commissioningDate == commissioningDate) &&
            (identical(other.serialNumber, serialNumber) ||
                other.serialNumber == serialNumber) &&
            (identical(other.registrationNumber, registrationNumber) ||
                other.registrationNumber == registrationNumber) &&
            (identical(other.registrationDate, registrationDate) ||
                other.registrationDate == registrationDate) &&
            (identical(other.registrar, registrar) ||
                other.registrar == registrar) &&
            (identical(other.notes, notes) || other.notes == notes) &&
            (identical(other.owner, owner) || other.owner == owner) &&
            (identical(other.techConditions, techConditions) ||
                other.techConditions == techConditions) &&
            (identical(other.pripiska, pripiska) ||
                other.pripiska == pripiska) &&
            (identical(other.reRegistrationDate, reRegistrationDate) ||
                other.reRegistrationDate == reRegistrationDate) &&
            (identical(other.pressure, pressure) ||
                other.pressure == pressure) &&
            (identical(other.testPressure, testPressure) ||
                other.testPressure == testPressure) &&
            (identical(other.rent, rent) || other.rent == rent) &&
            (identical(other.affiliation, affiliation) ||
                other.affiliation == affiliation) &&
            (identical(other.serviceLifeYears, serviceLifeYears) ||
                other.serviceLifeYears == serviceLifeYears) &&
            (identical(other.periodMajorRepair, periodMajorRepair) ||
                other.periodMajorRepair == periodMajorRepair) &&
            (identical(other.periodPeriodicTest, periodPeriodicTest) ||
                other.periodPeriodicTest == periodPeriodicTest) &&
            (identical(other.periodIntermediateTest, periodIntermediateTest) ||
                other.periodIntermediateTest == periodIntermediateTest) &&
            (identical(other.periodDepotRepair, periodDepotRepair) ||
                other.periodDepotRepair == periodDepotRepair) &&
            (identical(other.dangerClass, dangerClass) ||
                other.dangerClass == dangerClass) &&
            (identical(other.substance, substance) ||
                other.substance == substance) &&
            (identical(other.tareWeight2, tareWeight2) ||
                other.tareWeight2 == tareWeight2) &&
            (identical(other.tareWeight3, tareWeight3) ||
                other.tareWeight3 == tareWeight3) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.updatedAt, updatedAt) ||
                other.updatedAt == updatedAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hashAll([
    runtimeType,
    id,
    number,
    manufacturer,
    buildDate,
    tareWeight,
    loadCapacity,
    length,
    axleCount,
    volume,
    fillingVolume,
    initialTareWeight,
    type,
    model,
    commissioningDate,
    serialNumber,
    registrationNumber,
    registrationDate,
    registrar,
    notes,
    owner,
    techConditions,
    pripiska,
    reRegistrationDate,
    pressure,
    testPressure,
    rent,
    affiliation,
    serviceLifeYears,
    periodMajorRepair,
    periodPeriodicTest,
    periodIntermediateTest,
    periodDepotRepair,
    dangerClass,
    substance,
    tareWeight2,
    tareWeight3,
    createdAt,
    updatedAt,
  ]);

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RailwayCisternDetailDTOImplCopyWith<_$RailwayCisternDetailDTOImpl>
  get copyWith =>
      __$$RailwayCisternDetailDTOImplCopyWithImpl<
        _$RailwayCisternDetailDTOImpl
      >(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RailwayCisternDetailDTOImplToJson(this);
  }
}

abstract class _RailwayCisternDetailDTO implements RailwayCisternDetailDTO {
  const factory _RailwayCisternDetailDTO({
    required final String id,
    required final String number,
    required final Manufacturer manufacturer,
    required final String buildDate,
    required final double tareWeight,
    required final double loadCapacity,
    required final double length,
    required final int axleCount,
    required final double volume,
    final double? fillingVolume,
    final double? initialTareWeight,
    required final WagonType type,
    final WagonModel? model,
    final String? commissioningDate,
    required final String serialNumber,
    required final String registrationNumber,
    required final String registrationDate,
    final Registrar? registrar,
    required final String notes,
    final Owner? owner,
    final String? techConditions,
    final String? pripiska,
    final String? reRegistrationDate,
    required final double pressure,
    required final double testPressure,
    final String? rent,
    required final Affiliation affiliation,
    required final int serviceLifeYears,
    final String? periodMajorRepair,
    final String? periodPeriodicTest,
    final String? periodIntermediateTest,
    final String? periodDepotRepair,
    required final int dangerClass,
    required final String substance,
    required final double tareWeight2,
    required final double tareWeight3,
    required final DateTime createdAt,
    required final DateTime updatedAt,
  }) = _$RailwayCisternDetailDTOImpl;

  factory _RailwayCisternDetailDTO.fromJson(Map<String, dynamic> json) =
      _$RailwayCisternDetailDTOImpl.fromJson;

  @override
  String get id;
  @override
  String get number;
  @override
  Manufacturer get manufacturer;
  @override
  String get buildDate;
  @override
  double get tareWeight;
  @override
  double get loadCapacity;
  @override
  double get length;
  @override
  int get axleCount;
  @override
  double get volume;
  @override
  double? get fillingVolume;
  @override
  double? get initialTareWeight;
  @override
  WagonType get type;
  @override
  WagonModel? get model;
  @override
  String? get commissioningDate;
  @override
  String get serialNumber;
  @override
  String get registrationNumber;
  @override
  String get registrationDate;
  @override
  Registrar? get registrar;
  @override
  String get notes;
  @override
  Owner? get owner;
  @override
  String? get techConditions;
  @override
  String? get pripiska;
  @override
  String? get reRegistrationDate;
  @override
  double get pressure;
  @override
  double get testPressure;
  @override
  String? get rent;
  @override
  Affiliation get affiliation;
  @override
  int get serviceLifeYears;
  @override
  String? get periodMajorRepair;
  @override
  String? get periodPeriodicTest;
  @override
  String? get periodIntermediateTest;
  @override
  String? get periodDepotRepair;
  @override
  int get dangerClass;
  @override
  String get substance;
  @override
  double get tareWeight2;
  @override
  double get tareWeight3;
  @override
  DateTime get createdAt;
  @override
  DateTime get updatedAt;

  /// Create a copy of RailwayCisternDetailDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RailwayCisternDetailDTOImplCopyWith<_$RailwayCisternDetailDTOImpl>
  get copyWith => throw _privateConstructorUsedError;
}

Manufacturer _$ManufacturerFromJson(Map<String, dynamic> json) {
  return _Manufacturer.fromJson(json);
}

/// @nodoc
mixin _$Manufacturer {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get country => throw _privateConstructorUsedError;
  String? get shortName => throw _privateConstructorUsedError;
  String? get code => throw _privateConstructorUsedError;
  DateTime? get createdAt => throw _privateConstructorUsedError;
  DateTime? get updatedAt => throw _privateConstructorUsedError;

  /// Serializes this Manufacturer to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Manufacturer
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ManufacturerCopyWith<Manufacturer> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ManufacturerCopyWith<$Res> {
  factory $ManufacturerCopyWith(
    Manufacturer value,
    $Res Function(Manufacturer) then,
  ) = _$ManufacturerCopyWithImpl<$Res, Manufacturer>;
  @useResult
  $Res call({
    String id,
    String name,
    String? country,
    String? shortName,
    String? code,
    DateTime? createdAt,
    DateTime? updatedAt,
  });
}

/// @nodoc
class _$ManufacturerCopyWithImpl<$Res, $Val extends Manufacturer>
    implements $ManufacturerCopyWith<$Res> {
  _$ManufacturerCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Manufacturer
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? country = freezed,
    Object? shortName = freezed,
    Object? code = freezed,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            country: freezed == country
                ? _value.country
                : country // ignore: cast_nullable_to_non_nullable
                      as String?,
            shortName: freezed == shortName
                ? _value.shortName
                : shortName // ignore: cast_nullable_to_non_nullable
                      as String?,
            code: freezed == code
                ? _value.code
                : code // ignore: cast_nullable_to_non_nullable
                      as String?,
            createdAt: freezed == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            updatedAt: freezed == updatedAt
                ? _value.updatedAt
                : updatedAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$ManufacturerImplCopyWith<$Res>
    implements $ManufacturerCopyWith<$Res> {
  factory _$$ManufacturerImplCopyWith(
    _$ManufacturerImpl value,
    $Res Function(_$ManufacturerImpl) then,
  ) = __$$ManufacturerImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String name,
    String? country,
    String? shortName,
    String? code,
    DateTime? createdAt,
    DateTime? updatedAt,
  });
}

/// @nodoc
class __$$ManufacturerImplCopyWithImpl<$Res>
    extends _$ManufacturerCopyWithImpl<$Res, _$ManufacturerImpl>
    implements _$$ManufacturerImplCopyWith<$Res> {
  __$$ManufacturerImplCopyWithImpl(
    _$ManufacturerImpl _value,
    $Res Function(_$ManufacturerImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Manufacturer
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? country = freezed,
    Object? shortName = freezed,
    Object? code = freezed,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(
      _$ManufacturerImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        country: freezed == country
            ? _value.country
            : country // ignore: cast_nullable_to_non_nullable
                  as String?,
        shortName: freezed == shortName
            ? _value.shortName
            : shortName // ignore: cast_nullable_to_non_nullable
                  as String?,
        code: freezed == code
            ? _value.code
            : code // ignore: cast_nullable_to_non_nullable
                  as String?,
        createdAt: freezed == createdAt
            ? _value.createdAt
            : createdAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        updatedAt: freezed == updatedAt
            ? _value.updatedAt
            : updatedAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$ManufacturerImpl implements _Manufacturer {
  const _$ManufacturerImpl({
    required this.id,
    required this.name,
    this.country,
    this.shortName,
    this.code,
    this.createdAt,
    this.updatedAt,
  });

  factory _$ManufacturerImpl.fromJson(Map<String, dynamic> json) =>
      _$$ManufacturerImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String? country;
  @override
  final String? shortName;
  @override
  final String? code;
  @override
  final DateTime? createdAt;
  @override
  final DateTime? updatedAt;

  @override
  String toString() {
    return 'Manufacturer(id: $id, name: $name, country: $country, shortName: $shortName, code: $code, createdAt: $createdAt, updatedAt: $updatedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ManufacturerImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.country, country) || other.country == country) &&
            (identical(other.shortName, shortName) ||
                other.shortName == shortName) &&
            (identical(other.code, code) || other.code == code) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.updatedAt, updatedAt) ||
                other.updatedAt == updatedAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    name,
    country,
    shortName,
    code,
    createdAt,
    updatedAt,
  );

  /// Create a copy of Manufacturer
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ManufacturerImplCopyWith<_$ManufacturerImpl> get copyWith =>
      __$$ManufacturerImplCopyWithImpl<_$ManufacturerImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ManufacturerImplToJson(this);
  }
}

abstract class _Manufacturer implements Manufacturer {
  const factory _Manufacturer({
    required final String id,
    required final String name,
    final String? country,
    final String? shortName,
    final String? code,
    final DateTime? createdAt,
    final DateTime? updatedAt,
  }) = _$ManufacturerImpl;

  factory _Manufacturer.fromJson(Map<String, dynamic> json) =
      _$ManufacturerImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String? get country;
  @override
  String? get shortName;
  @override
  String? get code;
  @override
  DateTime? get createdAt;
  @override
  DateTime? get updatedAt;

  /// Create a copy of Manufacturer
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ManufacturerImplCopyWith<_$ManufacturerImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

WagonType _$WagonTypeFromJson(Map<String, dynamic> json) {
  return _WagonType.fromJson(json);
}

/// @nodoc
mixin _$WagonType {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get type => throw _privateConstructorUsedError;

  /// Serializes this WagonType to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of WagonType
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $WagonTypeCopyWith<WagonType> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $WagonTypeCopyWith<$Res> {
  factory $WagonTypeCopyWith(WagonType value, $Res Function(WagonType) then) =
      _$WagonTypeCopyWithImpl<$Res, WagonType>;
  @useResult
  $Res call({String id, String name, String? type});
}

/// @nodoc
class _$WagonTypeCopyWithImpl<$Res, $Val extends WagonType>
    implements $WagonTypeCopyWith<$Res> {
  _$WagonTypeCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of WagonType
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? name = null, Object? type = freezed}) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            type: freezed == type
                ? _value.type
                : type // ignore: cast_nullable_to_non_nullable
                      as String?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$WagonTypeImplCopyWith<$Res>
    implements $WagonTypeCopyWith<$Res> {
  factory _$$WagonTypeImplCopyWith(
    _$WagonTypeImpl value,
    $Res Function(_$WagonTypeImpl) then,
  ) = __$$WagonTypeImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, String name, String? type});
}

/// @nodoc
class __$$WagonTypeImplCopyWithImpl<$Res>
    extends _$WagonTypeCopyWithImpl<$Res, _$WagonTypeImpl>
    implements _$$WagonTypeImplCopyWith<$Res> {
  __$$WagonTypeImplCopyWithImpl(
    _$WagonTypeImpl _value,
    $Res Function(_$WagonTypeImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of WagonType
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? name = null, Object? type = freezed}) {
    return _then(
      _$WagonTypeImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        type: freezed == type
            ? _value.type
            : type // ignore: cast_nullable_to_non_nullable
                  as String?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$WagonTypeImpl implements _WagonType {
  const _$WagonTypeImpl({required this.id, required this.name, this.type});

  factory _$WagonTypeImpl.fromJson(Map<String, dynamic> json) =>
      _$$WagonTypeImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String? type;

  @override
  String toString() {
    return 'WagonType(id: $id, name: $name, type: $type)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$WagonTypeImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.type, type) || other.type == type));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, name, type);

  /// Create a copy of WagonType
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$WagonTypeImplCopyWith<_$WagonTypeImpl> get copyWith =>
      __$$WagonTypeImplCopyWithImpl<_$WagonTypeImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$WagonTypeImplToJson(this);
  }
}

abstract class _WagonType implements WagonType {
  const factory _WagonType({
    required final String id,
    required final String name,
    final String? type,
  }) = _$WagonTypeImpl;

  factory _WagonType.fromJson(Map<String, dynamic> json) =
      _$WagonTypeImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String? get type;

  /// Create a copy of WagonType
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$WagonTypeImplCopyWith<_$WagonTypeImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

WagonModel _$WagonModelFromJson(Map<String, dynamic> json) {
  return _WagonModel.fromJson(json);
}

/// @nodoc
mixin _$WagonModel {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;

  /// Serializes this WagonModel to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of WagonModel
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $WagonModelCopyWith<WagonModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $WagonModelCopyWith<$Res> {
  factory $WagonModelCopyWith(
    WagonModel value,
    $Res Function(WagonModel) then,
  ) = _$WagonModelCopyWithImpl<$Res, WagonModel>;
  @useResult
  $Res call({String id, String name});
}

/// @nodoc
class _$WagonModelCopyWithImpl<$Res, $Val extends WagonModel>
    implements $WagonModelCopyWith<$Res> {
  _$WagonModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of WagonModel
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? name = null}) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$WagonModelImplCopyWith<$Res>
    implements $WagonModelCopyWith<$Res> {
  factory _$$WagonModelImplCopyWith(
    _$WagonModelImpl value,
    $Res Function(_$WagonModelImpl) then,
  ) = __$$WagonModelImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, String name});
}

/// @nodoc
class __$$WagonModelImplCopyWithImpl<$Res>
    extends _$WagonModelCopyWithImpl<$Res, _$WagonModelImpl>
    implements _$$WagonModelImplCopyWith<$Res> {
  __$$WagonModelImplCopyWithImpl(
    _$WagonModelImpl _value,
    $Res Function(_$WagonModelImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of WagonModel
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? name = null}) {
    return _then(
      _$WagonModelImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$WagonModelImpl implements _WagonModel {
  const _$WagonModelImpl({required this.id, required this.name});

  factory _$WagonModelImpl.fromJson(Map<String, dynamic> json) =>
      _$$WagonModelImplFromJson(json);

  @override
  final String id;
  @override
  final String name;

  @override
  String toString() {
    return 'WagonModel(id: $id, name: $name)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$WagonModelImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, name);

  /// Create a copy of WagonModel
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$WagonModelImplCopyWith<_$WagonModelImpl> get copyWith =>
      __$$WagonModelImplCopyWithImpl<_$WagonModelImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$WagonModelImplToJson(this);
  }
}

abstract class _WagonModel implements WagonModel {
  const factory _WagonModel({
    required final String id,
    required final String name,
  }) = _$WagonModelImpl;

  factory _WagonModel.fromJson(Map<String, dynamic> json) =
      _$WagonModelImpl.fromJson;

  @override
  String get id;
  @override
  String get name;

  /// Create a copy of WagonModel
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$WagonModelImplCopyWith<_$WagonModelImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Registrar _$RegistrarFromJson(Map<String, dynamic> json) {
  return _Registrar.fromJson(json);
}

/// @nodoc
mixin _$Registrar {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;

  /// Serializes this Registrar to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Registrar
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RegistrarCopyWith<Registrar> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RegistrarCopyWith<$Res> {
  factory $RegistrarCopyWith(Registrar value, $Res Function(Registrar) then) =
      _$RegistrarCopyWithImpl<$Res, Registrar>;
  @useResult
  $Res call({String id, String name});
}

/// @nodoc
class _$RegistrarCopyWithImpl<$Res, $Val extends Registrar>
    implements $RegistrarCopyWith<$Res> {
  _$RegistrarCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Registrar
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? name = null}) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$RegistrarImplCopyWith<$Res>
    implements $RegistrarCopyWith<$Res> {
  factory _$$RegistrarImplCopyWith(
    _$RegistrarImpl value,
    $Res Function(_$RegistrarImpl) then,
  ) = __$$RegistrarImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, String name});
}

/// @nodoc
class __$$RegistrarImplCopyWithImpl<$Res>
    extends _$RegistrarCopyWithImpl<$Res, _$RegistrarImpl>
    implements _$$RegistrarImplCopyWith<$Res> {
  __$$RegistrarImplCopyWithImpl(
    _$RegistrarImpl _value,
    $Res Function(_$RegistrarImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Registrar
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? name = null}) {
    return _then(
      _$RegistrarImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RegistrarImpl implements _Registrar {
  const _$RegistrarImpl({required this.id, required this.name});

  factory _$RegistrarImpl.fromJson(Map<String, dynamic> json) =>
      _$$RegistrarImplFromJson(json);

  @override
  final String id;
  @override
  final String name;

  @override
  String toString() {
    return 'Registrar(id: $id, name: $name)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RegistrarImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, name);

  /// Create a copy of Registrar
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RegistrarImplCopyWith<_$RegistrarImpl> get copyWith =>
      __$$RegistrarImplCopyWithImpl<_$RegistrarImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RegistrarImplToJson(this);
  }
}

abstract class _Registrar implements Registrar {
  const factory _Registrar({
    required final String id,
    required final String name,
  }) = _$RegistrarImpl;

  factory _Registrar.fromJson(Map<String, dynamic> json) =
      _$RegistrarImpl.fromJson;

  @override
  String get id;
  @override
  String get name;

  /// Create a copy of Registrar
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RegistrarImplCopyWith<_$RegistrarImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Owner _$OwnerFromJson(Map<String, dynamic> json) {
  return _Owner.fromJson(json);
}

/// @nodoc
mixin _$Owner {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get unp => throw _privateConstructorUsedError;
  String? get shortName => throw _privateConstructorUsedError;
  String? get address => throw _privateConstructorUsedError;
  bool? get treatRepairs => throw _privateConstructorUsedError;
  DateTime? get createdAt => throw _privateConstructorUsedError;
  DateTime? get updatedAt => throw _privateConstructorUsedError;

  /// Serializes this Owner to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Owner
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $OwnerCopyWith<Owner> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OwnerCopyWith<$Res> {
  factory $OwnerCopyWith(Owner value, $Res Function(Owner) then) =
      _$OwnerCopyWithImpl<$Res, Owner>;
  @useResult
  $Res call({
    String id,
    String name,
    String? unp,
    String? shortName,
    String? address,
    bool? treatRepairs,
    DateTime? createdAt,
    DateTime? updatedAt,
  });
}

/// @nodoc
class _$OwnerCopyWithImpl<$Res, $Val extends Owner>
    implements $OwnerCopyWith<$Res> {
  _$OwnerCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Owner
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? unp = freezed,
    Object? shortName = freezed,
    Object? address = freezed,
    Object? treatRepairs = freezed,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            name: null == name
                ? _value.name
                : name // ignore: cast_nullable_to_non_nullable
                      as String,
            unp: freezed == unp
                ? _value.unp
                : unp // ignore: cast_nullable_to_non_nullable
                      as String?,
            shortName: freezed == shortName
                ? _value.shortName
                : shortName // ignore: cast_nullable_to_non_nullable
                      as String?,
            address: freezed == address
                ? _value.address
                : address // ignore: cast_nullable_to_non_nullable
                      as String?,
            treatRepairs: freezed == treatRepairs
                ? _value.treatRepairs
                : treatRepairs // ignore: cast_nullable_to_non_nullable
                      as bool?,
            createdAt: freezed == createdAt
                ? _value.createdAt
                : createdAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
            updatedAt: freezed == updatedAt
                ? _value.updatedAt
                : updatedAt // ignore: cast_nullable_to_non_nullable
                      as DateTime?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$OwnerImplCopyWith<$Res> implements $OwnerCopyWith<$Res> {
  factory _$$OwnerImplCopyWith(
    _$OwnerImpl value,
    $Res Function(_$OwnerImpl) then,
  ) = __$$OwnerImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String name,
    String? unp,
    String? shortName,
    String? address,
    bool? treatRepairs,
    DateTime? createdAt,
    DateTime? updatedAt,
  });
}

/// @nodoc
class __$$OwnerImplCopyWithImpl<$Res>
    extends _$OwnerCopyWithImpl<$Res, _$OwnerImpl>
    implements _$$OwnerImplCopyWith<$Res> {
  __$$OwnerImplCopyWithImpl(
    _$OwnerImpl _value,
    $Res Function(_$OwnerImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Owner
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? unp = freezed,
    Object? shortName = freezed,
    Object? address = freezed,
    Object? treatRepairs = freezed,
    Object? createdAt = freezed,
    Object? updatedAt = freezed,
  }) {
    return _then(
      _$OwnerImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        name: null == name
            ? _value.name
            : name // ignore: cast_nullable_to_non_nullable
                  as String,
        unp: freezed == unp
            ? _value.unp
            : unp // ignore: cast_nullable_to_non_nullable
                  as String?,
        shortName: freezed == shortName
            ? _value.shortName
            : shortName // ignore: cast_nullable_to_non_nullable
                  as String?,
        address: freezed == address
            ? _value.address
            : address // ignore: cast_nullable_to_non_nullable
                  as String?,
        treatRepairs: freezed == treatRepairs
            ? _value.treatRepairs
            : treatRepairs // ignore: cast_nullable_to_non_nullable
                  as bool?,
        createdAt: freezed == createdAt
            ? _value.createdAt
            : createdAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
        updatedAt: freezed == updatedAt
            ? _value.updatedAt
            : updatedAt // ignore: cast_nullable_to_non_nullable
                  as DateTime?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$OwnerImpl implements _Owner {
  const _$OwnerImpl({
    required this.id,
    required this.name,
    this.unp,
    this.shortName,
    this.address,
    this.treatRepairs,
    this.createdAt,
    this.updatedAt,
  });

  factory _$OwnerImpl.fromJson(Map<String, dynamic> json) =>
      _$$OwnerImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String? unp;
  @override
  final String? shortName;
  @override
  final String? address;
  @override
  final bool? treatRepairs;
  @override
  final DateTime? createdAt;
  @override
  final DateTime? updatedAt;

  @override
  String toString() {
    return 'Owner(id: $id, name: $name, unp: $unp, shortName: $shortName, address: $address, treatRepairs: $treatRepairs, createdAt: $createdAt, updatedAt: $updatedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$OwnerImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.unp, unp) || other.unp == unp) &&
            (identical(other.shortName, shortName) ||
                other.shortName == shortName) &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.treatRepairs, treatRepairs) ||
                other.treatRepairs == treatRepairs) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.updatedAt, updatedAt) ||
                other.updatedAt == updatedAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    name,
    unp,
    shortName,
    address,
    treatRepairs,
    createdAt,
    updatedAt,
  );

  /// Create a copy of Owner
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$OwnerImplCopyWith<_$OwnerImpl> get copyWith =>
      __$$OwnerImplCopyWithImpl<_$OwnerImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$OwnerImplToJson(this);
  }
}

abstract class _Owner implements Owner {
  const factory _Owner({
    required final String id,
    required final String name,
    final String? unp,
    final String? shortName,
    final String? address,
    final bool? treatRepairs,
    final DateTime? createdAt,
    final DateTime? updatedAt,
  }) = _$OwnerImpl;

  factory _Owner.fromJson(Map<String, dynamic> json) = _$OwnerImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String? get unp;
  @override
  String? get shortName;
  @override
  String? get address;
  @override
  bool? get treatRepairs;
  @override
  DateTime? get createdAt;
  @override
  DateTime? get updatedAt;

  /// Create a copy of Owner
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$OwnerImplCopyWith<_$OwnerImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

Affiliation _$AffiliationFromJson(Map<String, dynamic> json) {
  return _Affiliation.fromJson(json);
}

/// @nodoc
mixin _$Affiliation {
  String get id => throw _privateConstructorUsedError;
  String get value => throw _privateConstructorUsedError;

  /// Serializes this Affiliation to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Affiliation
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AffiliationCopyWith<Affiliation> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AffiliationCopyWith<$Res> {
  factory $AffiliationCopyWith(
    Affiliation value,
    $Res Function(Affiliation) then,
  ) = _$AffiliationCopyWithImpl<$Res, Affiliation>;
  @useResult
  $Res call({String id, String value});
}

/// @nodoc
class _$AffiliationCopyWithImpl<$Res, $Val extends Affiliation>
    implements $AffiliationCopyWith<$Res> {
  _$AffiliationCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Affiliation
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? value = null}) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            value: null == value
                ? _value.value
                : value // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$AffiliationImplCopyWith<$Res>
    implements $AffiliationCopyWith<$Res> {
  factory _$$AffiliationImplCopyWith(
    _$AffiliationImpl value,
    $Res Function(_$AffiliationImpl) then,
  ) = __$$AffiliationImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String id, String value});
}

/// @nodoc
class __$$AffiliationImplCopyWithImpl<$Res>
    extends _$AffiliationCopyWithImpl<$Res, _$AffiliationImpl>
    implements _$$AffiliationImplCopyWith<$Res> {
  __$$AffiliationImplCopyWithImpl(
    _$AffiliationImpl _value,
    $Res Function(_$AffiliationImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of Affiliation
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({Object? id = null, Object? value = null}) {
    return _then(
      _$AffiliationImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        value: null == value
            ? _value.value
            : value // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$AffiliationImpl implements _Affiliation {
  const _$AffiliationImpl({required this.id, required this.value});

  factory _$AffiliationImpl.fromJson(Map<String, dynamic> json) =>
      _$$AffiliationImplFromJson(json);

  @override
  final String id;
  @override
  final String value;

  @override
  String toString() {
    return 'Affiliation(id: $id, value: $value)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AffiliationImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.value, value) || other.value == value));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, value);

  /// Create a copy of Affiliation
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AffiliationImplCopyWith<_$AffiliationImpl> get copyWith =>
      __$$AffiliationImplCopyWithImpl<_$AffiliationImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AffiliationImplToJson(this);
  }
}

abstract class _Affiliation implements Affiliation {
  const factory _Affiliation({
    required final String id,
    required final String value,
  }) = _$AffiliationImpl;

  factory _Affiliation.fromJson(Map<String, dynamic> json) =
      _$AffiliationImpl.fromJson;

  @override
  String get id;
  @override
  String get value;

  /// Create a copy of Affiliation
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AffiliationImplCopyWith<_$AffiliationImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

RailwayCisternListDTO _$RailwayCisternListDTOFromJson(
  Map<String, dynamic> json,
) {
  return _RailwayCisternListDTO.fromJson(json);
}

/// @nodoc
mixin _$RailwayCisternListDTO {
  String get id => throw _privateConstructorUsedError;
  String get number => throw _privateConstructorUsedError;
  String get manufacturerName => throw _privateConstructorUsedError;
  String get buildDate => throw _privateConstructorUsedError;
  String get typeName => throw _privateConstructorUsedError;
  String get modelName => throw _privateConstructorUsedError;
  String get ownerName => throw _privateConstructorUsedError;
  String get registrationNumber => throw _privateConstructorUsedError;
  String get registrationDate => throw _privateConstructorUsedError;
  String get affiliationValue => throw _privateConstructorUsedError;

  /// Serializes this RailwayCisternListDTO to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RailwayCisternListDTO
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RailwayCisternListDTOCopyWith<RailwayCisternListDTO> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RailwayCisternListDTOCopyWith<$Res> {
  factory $RailwayCisternListDTOCopyWith(
    RailwayCisternListDTO value,
    $Res Function(RailwayCisternListDTO) then,
  ) = _$RailwayCisternListDTOCopyWithImpl<$Res, RailwayCisternListDTO>;
  @useResult
  $Res call({
    String id,
    String number,
    String manufacturerName,
    String buildDate,
    String typeName,
    String modelName,
    String ownerName,
    String registrationNumber,
    String registrationDate,
    String affiliationValue,
  });
}

/// @nodoc
class _$RailwayCisternListDTOCopyWithImpl<
  $Res,
  $Val extends RailwayCisternListDTO
>
    implements $RailwayCisternListDTOCopyWith<$Res> {
  _$RailwayCisternListDTOCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RailwayCisternListDTO
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? number = null,
    Object? manufacturerName = null,
    Object? buildDate = null,
    Object? typeName = null,
    Object? modelName = null,
    Object? ownerName = null,
    Object? registrationNumber = null,
    Object? registrationDate = null,
    Object? affiliationValue = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            number: null == number
                ? _value.number
                : number // ignore: cast_nullable_to_non_nullable
                      as String,
            manufacturerName: null == manufacturerName
                ? _value.manufacturerName
                : manufacturerName // ignore: cast_nullable_to_non_nullable
                      as String,
            buildDate: null == buildDate
                ? _value.buildDate
                : buildDate // ignore: cast_nullable_to_non_nullable
                      as String,
            typeName: null == typeName
                ? _value.typeName
                : typeName // ignore: cast_nullable_to_non_nullable
                      as String,
            modelName: null == modelName
                ? _value.modelName
                : modelName // ignore: cast_nullable_to_non_nullable
                      as String,
            ownerName: null == ownerName
                ? _value.ownerName
                : ownerName // ignore: cast_nullable_to_non_nullable
                      as String,
            registrationNumber: null == registrationNumber
                ? _value.registrationNumber
                : registrationNumber // ignore: cast_nullable_to_non_nullable
                      as String,
            registrationDate: null == registrationDate
                ? _value.registrationDate
                : registrationDate // ignore: cast_nullable_to_non_nullable
                      as String,
            affiliationValue: null == affiliationValue
                ? _value.affiliationValue
                : affiliationValue // ignore: cast_nullable_to_non_nullable
                      as String,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$RailwayCisternListDTOImplCopyWith<$Res>
    implements $RailwayCisternListDTOCopyWith<$Res> {
  factory _$$RailwayCisternListDTOImplCopyWith(
    _$RailwayCisternListDTOImpl value,
    $Res Function(_$RailwayCisternListDTOImpl) then,
  ) = __$$RailwayCisternListDTOImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String number,
    String manufacturerName,
    String buildDate,
    String typeName,
    String modelName,
    String ownerName,
    String registrationNumber,
    String registrationDate,
    String affiliationValue,
  });
}

/// @nodoc
class __$$RailwayCisternListDTOImplCopyWithImpl<$Res>
    extends
        _$RailwayCisternListDTOCopyWithImpl<$Res, _$RailwayCisternListDTOImpl>
    implements _$$RailwayCisternListDTOImplCopyWith<$Res> {
  __$$RailwayCisternListDTOImplCopyWithImpl(
    _$RailwayCisternListDTOImpl _value,
    $Res Function(_$RailwayCisternListDTOImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of RailwayCisternListDTO
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? number = null,
    Object? manufacturerName = null,
    Object? buildDate = null,
    Object? typeName = null,
    Object? modelName = null,
    Object? ownerName = null,
    Object? registrationNumber = null,
    Object? registrationDate = null,
    Object? affiliationValue = null,
  }) {
    return _then(
      _$RailwayCisternListDTOImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        number: null == number
            ? _value.number
            : number // ignore: cast_nullable_to_non_nullable
                  as String,
        manufacturerName: null == manufacturerName
            ? _value.manufacturerName
            : manufacturerName // ignore: cast_nullable_to_non_nullable
                  as String,
        buildDate: null == buildDate
            ? _value.buildDate
            : buildDate // ignore: cast_nullable_to_non_nullable
                  as String,
        typeName: null == typeName
            ? _value.typeName
            : typeName // ignore: cast_nullable_to_non_nullable
                  as String,
        modelName: null == modelName
            ? _value.modelName
            : modelName // ignore: cast_nullable_to_non_nullable
                  as String,
        ownerName: null == ownerName
            ? _value.ownerName
            : ownerName // ignore: cast_nullable_to_non_nullable
                  as String,
        registrationNumber: null == registrationNumber
            ? _value.registrationNumber
            : registrationNumber // ignore: cast_nullable_to_non_nullable
                  as String,
        registrationDate: null == registrationDate
            ? _value.registrationDate
            : registrationDate // ignore: cast_nullable_to_non_nullable
                  as String,
        affiliationValue: null == affiliationValue
            ? _value.affiliationValue
            : affiliationValue // ignore: cast_nullable_to_non_nullable
                  as String,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$RailwayCisternListDTOImpl implements _RailwayCisternListDTO {
  const _$RailwayCisternListDTOImpl({
    required this.id,
    required this.number,
    required this.manufacturerName,
    required this.buildDate,
    required this.typeName,
    required this.modelName,
    required this.ownerName,
    required this.registrationNumber,
    required this.registrationDate,
    required this.affiliationValue,
  });

  factory _$RailwayCisternListDTOImpl.fromJson(Map<String, dynamic> json) =>
      _$$RailwayCisternListDTOImplFromJson(json);

  @override
  final String id;
  @override
  final String number;
  @override
  final String manufacturerName;
  @override
  final String buildDate;
  @override
  final String typeName;
  @override
  final String modelName;
  @override
  final String ownerName;
  @override
  final String registrationNumber;
  @override
  final String registrationDate;
  @override
  final String affiliationValue;

  @override
  String toString() {
    return 'RailwayCisternListDTO(id: $id, number: $number, manufacturerName: $manufacturerName, buildDate: $buildDate, typeName: $typeName, modelName: $modelName, ownerName: $ownerName, registrationNumber: $registrationNumber, registrationDate: $registrationDate, affiliationValue: $affiliationValue)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RailwayCisternListDTOImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.number, number) || other.number == number) &&
            (identical(other.manufacturerName, manufacturerName) ||
                other.manufacturerName == manufacturerName) &&
            (identical(other.buildDate, buildDate) ||
                other.buildDate == buildDate) &&
            (identical(other.typeName, typeName) ||
                other.typeName == typeName) &&
            (identical(other.modelName, modelName) ||
                other.modelName == modelName) &&
            (identical(other.ownerName, ownerName) ||
                other.ownerName == ownerName) &&
            (identical(other.registrationNumber, registrationNumber) ||
                other.registrationNumber == registrationNumber) &&
            (identical(other.registrationDate, registrationDate) ||
                other.registrationDate == registrationDate) &&
            (identical(other.affiliationValue, affiliationValue) ||
                other.affiliationValue == affiliationValue));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    id,
    number,
    manufacturerName,
    buildDate,
    typeName,
    modelName,
    ownerName,
    registrationNumber,
    registrationDate,
    affiliationValue,
  );

  /// Create a copy of RailwayCisternListDTO
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RailwayCisternListDTOImplCopyWith<_$RailwayCisternListDTOImpl>
  get copyWith =>
      __$$RailwayCisternListDTOImplCopyWithImpl<_$RailwayCisternListDTOImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$RailwayCisternListDTOImplToJson(this);
  }
}

abstract class _RailwayCisternListDTO implements RailwayCisternListDTO {
  const factory _RailwayCisternListDTO({
    required final String id,
    required final String number,
    required final String manufacturerName,
    required final String buildDate,
    required final String typeName,
    required final String modelName,
    required final String ownerName,
    required final String registrationNumber,
    required final String registrationDate,
    required final String affiliationValue,
  }) = _$RailwayCisternListDTOImpl;

  factory _RailwayCisternListDTO.fromJson(Map<String, dynamic> json) =
      _$RailwayCisternListDTOImpl.fromJson;

  @override
  String get id;
  @override
  String get number;
  @override
  String get manufacturerName;
  @override
  String get buildDate;
  @override
  String get typeName;
  @override
  String get modelName;
  @override
  String get ownerName;
  @override
  String get registrationNumber;
  @override
  String get registrationDate;
  @override
  String get affiliationValue;

  /// Create a copy of RailwayCisternListDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RailwayCisternListDTOImplCopyWith<_$RailwayCisternListDTOImpl>
  get copyWith => throw _privateConstructorUsedError;
}

CreateRailwayCisternDTO _$CreateRailwayCisternDTOFromJson(
  Map<String, dynamic> json,
) {
  return _CreateRailwayCisternDTO.fromJson(json);
}

/// @nodoc
mixin _$CreateRailwayCisternDTO {
  String get number => throw _privateConstructorUsedError;
  String get manufacturerId => throw _privateConstructorUsedError;
  String get buildDate => throw _privateConstructorUsedError;
  double get tareWeight => throw _privateConstructorUsedError;
  double get loadCapacity => throw _privateConstructorUsedError;
  double get length => throw _privateConstructorUsedError;
  int get axleCount => throw _privateConstructorUsedError;
  double get volume => throw _privateConstructorUsedError;
  double? get fillingVolume => throw _privateConstructorUsedError;
  double? get initialTareWeight => throw _privateConstructorUsedError;
  String get typeId => throw _privateConstructorUsedError;
  String? get modelId => throw _privateConstructorUsedError;
  String? get commissioningDate => throw _privateConstructorUsedError;
  String get serialNumber => throw _privateConstructorUsedError;
  String get registrationNumber => throw _privateConstructorUsedError;
  String get registrationDate => throw _privateConstructorUsedError;
  String? get registrarId => throw _privateConstructorUsedError;
  String get notes => throw _privateConstructorUsedError;
  String? get ownerId => throw _privateConstructorUsedError;
  String? get techConditions => throw _privateConstructorUsedError;
  String? get pripiska => throw _privateConstructorUsedError;
  String? get reRegistrationDate => throw _privateConstructorUsedError;
  double get pressure => throw _privateConstructorUsedError;
  double get testPressure => throw _privateConstructorUsedError;
  String? get rent => throw _privateConstructorUsedError;
  String get affiliationId => throw _privateConstructorUsedError;
  int get serviceLifeYears => throw _privateConstructorUsedError;
  String? get periodMajorRepair => throw _privateConstructorUsedError;
  String? get periodPeriodicTest => throw _privateConstructorUsedError;
  String? get periodIntermediateTest => throw _privateConstructorUsedError;
  String? get periodDepotRepair => throw _privateConstructorUsedError;
  int get dangerClass => throw _privateConstructorUsedError;
  String get substance => throw _privateConstructorUsedError;
  double get tareWeight2 => throw _privateConstructorUsedError;
  double get tareWeight3 => throw _privateConstructorUsedError;

  /// Serializes this CreateRailwayCisternDTO to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CreateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CreateRailwayCisternDTOCopyWith<CreateRailwayCisternDTO> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CreateRailwayCisternDTOCopyWith<$Res> {
  factory $CreateRailwayCisternDTOCopyWith(
    CreateRailwayCisternDTO value,
    $Res Function(CreateRailwayCisternDTO) then,
  ) = _$CreateRailwayCisternDTOCopyWithImpl<$Res, CreateRailwayCisternDTO>;
  @useResult
  $Res call({
    String number,
    String manufacturerId,
    String buildDate,
    double tareWeight,
    double loadCapacity,
    double length,
    int axleCount,
    double volume,
    double? fillingVolume,
    double? initialTareWeight,
    String typeId,
    String? modelId,
    String? commissioningDate,
    String serialNumber,
    String registrationNumber,
    String registrationDate,
    String? registrarId,
    String notes,
    String? ownerId,
    String? techConditions,
    String? pripiska,
    String? reRegistrationDate,
    double pressure,
    double testPressure,
    String? rent,
    String affiliationId,
    int serviceLifeYears,
    String? periodMajorRepair,
    String? periodPeriodicTest,
    String? periodIntermediateTest,
    String? periodDepotRepair,
    int dangerClass,
    String substance,
    double tareWeight2,
    double tareWeight3,
  });
}

/// @nodoc
class _$CreateRailwayCisternDTOCopyWithImpl<
  $Res,
  $Val extends CreateRailwayCisternDTO
>
    implements $CreateRailwayCisternDTOCopyWith<$Res> {
  _$CreateRailwayCisternDTOCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CreateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? number = null,
    Object? manufacturerId = null,
    Object? buildDate = null,
    Object? tareWeight = null,
    Object? loadCapacity = null,
    Object? length = null,
    Object? axleCount = null,
    Object? volume = null,
    Object? fillingVolume = freezed,
    Object? initialTareWeight = freezed,
    Object? typeId = null,
    Object? modelId = freezed,
    Object? commissioningDate = freezed,
    Object? serialNumber = null,
    Object? registrationNumber = null,
    Object? registrationDate = null,
    Object? registrarId = freezed,
    Object? notes = null,
    Object? ownerId = freezed,
    Object? techConditions = freezed,
    Object? pripiska = freezed,
    Object? reRegistrationDate = freezed,
    Object? pressure = null,
    Object? testPressure = null,
    Object? rent = freezed,
    Object? affiliationId = null,
    Object? serviceLifeYears = null,
    Object? periodMajorRepair = freezed,
    Object? periodPeriodicTest = freezed,
    Object? periodIntermediateTest = freezed,
    Object? periodDepotRepair = freezed,
    Object? dangerClass = null,
    Object? substance = null,
    Object? tareWeight2 = null,
    Object? tareWeight3 = null,
  }) {
    return _then(
      _value.copyWith(
            number: null == number
                ? _value.number
                : number // ignore: cast_nullable_to_non_nullable
                      as String,
            manufacturerId: null == manufacturerId
                ? _value.manufacturerId
                : manufacturerId // ignore: cast_nullable_to_non_nullable
                      as String,
            buildDate: null == buildDate
                ? _value.buildDate
                : buildDate // ignore: cast_nullable_to_non_nullable
                      as String,
            tareWeight: null == tareWeight
                ? _value.tareWeight
                : tareWeight // ignore: cast_nullable_to_non_nullable
                      as double,
            loadCapacity: null == loadCapacity
                ? _value.loadCapacity
                : loadCapacity // ignore: cast_nullable_to_non_nullable
                      as double,
            length: null == length
                ? _value.length
                : length // ignore: cast_nullable_to_non_nullable
                      as double,
            axleCount: null == axleCount
                ? _value.axleCount
                : axleCount // ignore: cast_nullable_to_non_nullable
                      as int,
            volume: null == volume
                ? _value.volume
                : volume // ignore: cast_nullable_to_non_nullable
                      as double,
            fillingVolume: freezed == fillingVolume
                ? _value.fillingVolume
                : fillingVolume // ignore: cast_nullable_to_non_nullable
                      as double?,
            initialTareWeight: freezed == initialTareWeight
                ? _value.initialTareWeight
                : initialTareWeight // ignore: cast_nullable_to_non_nullable
                      as double?,
            typeId: null == typeId
                ? _value.typeId
                : typeId // ignore: cast_nullable_to_non_nullable
                      as String,
            modelId: freezed == modelId
                ? _value.modelId
                : modelId // ignore: cast_nullable_to_non_nullable
                      as String?,
            commissioningDate: freezed == commissioningDate
                ? _value.commissioningDate
                : commissioningDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            serialNumber: null == serialNumber
                ? _value.serialNumber
                : serialNumber // ignore: cast_nullable_to_non_nullable
                      as String,
            registrationNumber: null == registrationNumber
                ? _value.registrationNumber
                : registrationNumber // ignore: cast_nullable_to_non_nullable
                      as String,
            registrationDate: null == registrationDate
                ? _value.registrationDate
                : registrationDate // ignore: cast_nullable_to_non_nullable
                      as String,
            registrarId: freezed == registrarId
                ? _value.registrarId
                : registrarId // ignore: cast_nullable_to_non_nullable
                      as String?,
            notes: null == notes
                ? _value.notes
                : notes // ignore: cast_nullable_to_non_nullable
                      as String,
            ownerId: freezed == ownerId
                ? _value.ownerId
                : ownerId // ignore: cast_nullable_to_non_nullable
                      as String?,
            techConditions: freezed == techConditions
                ? _value.techConditions
                : techConditions // ignore: cast_nullable_to_non_nullable
                      as String?,
            pripiska: freezed == pripiska
                ? _value.pripiska
                : pripiska // ignore: cast_nullable_to_non_nullable
                      as String?,
            reRegistrationDate: freezed == reRegistrationDate
                ? _value.reRegistrationDate
                : reRegistrationDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            pressure: null == pressure
                ? _value.pressure
                : pressure // ignore: cast_nullable_to_non_nullable
                      as double,
            testPressure: null == testPressure
                ? _value.testPressure
                : testPressure // ignore: cast_nullable_to_non_nullable
                      as double,
            rent: freezed == rent
                ? _value.rent
                : rent // ignore: cast_nullable_to_non_nullable
                      as String?,
            affiliationId: null == affiliationId
                ? _value.affiliationId
                : affiliationId // ignore: cast_nullable_to_non_nullable
                      as String,
            serviceLifeYears: null == serviceLifeYears
                ? _value.serviceLifeYears
                : serviceLifeYears // ignore: cast_nullable_to_non_nullable
                      as int,
            periodMajorRepair: freezed == periodMajorRepair
                ? _value.periodMajorRepair
                : periodMajorRepair // ignore: cast_nullable_to_non_nullable
                      as String?,
            periodPeriodicTest: freezed == periodPeriodicTest
                ? _value.periodPeriodicTest
                : periodPeriodicTest // ignore: cast_nullable_to_non_nullable
                      as String?,
            periodIntermediateTest: freezed == periodIntermediateTest
                ? _value.periodIntermediateTest
                : periodIntermediateTest // ignore: cast_nullable_to_non_nullable
                      as String?,
            periodDepotRepair: freezed == periodDepotRepair
                ? _value.periodDepotRepair
                : periodDepotRepair // ignore: cast_nullable_to_non_nullable
                      as String?,
            dangerClass: null == dangerClass
                ? _value.dangerClass
                : dangerClass // ignore: cast_nullable_to_non_nullable
                      as int,
            substance: null == substance
                ? _value.substance
                : substance // ignore: cast_nullable_to_non_nullable
                      as String,
            tareWeight2: null == tareWeight2
                ? _value.tareWeight2
                : tareWeight2 // ignore: cast_nullable_to_non_nullable
                      as double,
            tareWeight3: null == tareWeight3
                ? _value.tareWeight3
                : tareWeight3 // ignore: cast_nullable_to_non_nullable
                      as double,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$CreateRailwayCisternDTOImplCopyWith<$Res>
    implements $CreateRailwayCisternDTOCopyWith<$Res> {
  factory _$$CreateRailwayCisternDTOImplCopyWith(
    _$CreateRailwayCisternDTOImpl value,
    $Res Function(_$CreateRailwayCisternDTOImpl) then,
  ) = __$$CreateRailwayCisternDTOImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String number,
    String manufacturerId,
    String buildDate,
    double tareWeight,
    double loadCapacity,
    double length,
    int axleCount,
    double volume,
    double? fillingVolume,
    double? initialTareWeight,
    String typeId,
    String? modelId,
    String? commissioningDate,
    String serialNumber,
    String registrationNumber,
    String registrationDate,
    String? registrarId,
    String notes,
    String? ownerId,
    String? techConditions,
    String? pripiska,
    String? reRegistrationDate,
    double pressure,
    double testPressure,
    String? rent,
    String affiliationId,
    int serviceLifeYears,
    String? periodMajorRepair,
    String? periodPeriodicTest,
    String? periodIntermediateTest,
    String? periodDepotRepair,
    int dangerClass,
    String substance,
    double tareWeight2,
    double tareWeight3,
  });
}

/// @nodoc
class __$$CreateRailwayCisternDTOImplCopyWithImpl<$Res>
    extends
        _$CreateRailwayCisternDTOCopyWithImpl<
          $Res,
          _$CreateRailwayCisternDTOImpl
        >
    implements _$$CreateRailwayCisternDTOImplCopyWith<$Res> {
  __$$CreateRailwayCisternDTOImplCopyWithImpl(
    _$CreateRailwayCisternDTOImpl _value,
    $Res Function(_$CreateRailwayCisternDTOImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of CreateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? number = null,
    Object? manufacturerId = null,
    Object? buildDate = null,
    Object? tareWeight = null,
    Object? loadCapacity = null,
    Object? length = null,
    Object? axleCount = null,
    Object? volume = null,
    Object? fillingVolume = freezed,
    Object? initialTareWeight = freezed,
    Object? typeId = null,
    Object? modelId = freezed,
    Object? commissioningDate = freezed,
    Object? serialNumber = null,
    Object? registrationNumber = null,
    Object? registrationDate = null,
    Object? registrarId = freezed,
    Object? notes = null,
    Object? ownerId = freezed,
    Object? techConditions = freezed,
    Object? pripiska = freezed,
    Object? reRegistrationDate = freezed,
    Object? pressure = null,
    Object? testPressure = null,
    Object? rent = freezed,
    Object? affiliationId = null,
    Object? serviceLifeYears = null,
    Object? periodMajorRepair = freezed,
    Object? periodPeriodicTest = freezed,
    Object? periodIntermediateTest = freezed,
    Object? periodDepotRepair = freezed,
    Object? dangerClass = null,
    Object? substance = null,
    Object? tareWeight2 = null,
    Object? tareWeight3 = null,
  }) {
    return _then(
      _$CreateRailwayCisternDTOImpl(
        number: null == number
            ? _value.number
            : number // ignore: cast_nullable_to_non_nullable
                  as String,
        manufacturerId: null == manufacturerId
            ? _value.manufacturerId
            : manufacturerId // ignore: cast_nullable_to_non_nullable
                  as String,
        buildDate: null == buildDate
            ? _value.buildDate
            : buildDate // ignore: cast_nullable_to_non_nullable
                  as String,
        tareWeight: null == tareWeight
            ? _value.tareWeight
            : tareWeight // ignore: cast_nullable_to_non_nullable
                  as double,
        loadCapacity: null == loadCapacity
            ? _value.loadCapacity
            : loadCapacity // ignore: cast_nullable_to_non_nullable
                  as double,
        length: null == length
            ? _value.length
            : length // ignore: cast_nullable_to_non_nullable
                  as double,
        axleCount: null == axleCount
            ? _value.axleCount
            : axleCount // ignore: cast_nullable_to_non_nullable
                  as int,
        volume: null == volume
            ? _value.volume
            : volume // ignore: cast_nullable_to_non_nullable
                  as double,
        fillingVolume: freezed == fillingVolume
            ? _value.fillingVolume
            : fillingVolume // ignore: cast_nullable_to_non_nullable
                  as double?,
        initialTareWeight: freezed == initialTareWeight
            ? _value.initialTareWeight
            : initialTareWeight // ignore: cast_nullable_to_non_nullable
                  as double?,
        typeId: null == typeId
            ? _value.typeId
            : typeId // ignore: cast_nullable_to_non_nullable
                  as String,
        modelId: freezed == modelId
            ? _value.modelId
            : modelId // ignore: cast_nullable_to_non_nullable
                  as String?,
        commissioningDate: freezed == commissioningDate
            ? _value.commissioningDate
            : commissioningDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        serialNumber: null == serialNumber
            ? _value.serialNumber
            : serialNumber // ignore: cast_nullable_to_non_nullable
                  as String,
        registrationNumber: null == registrationNumber
            ? _value.registrationNumber
            : registrationNumber // ignore: cast_nullable_to_non_nullable
                  as String,
        registrationDate: null == registrationDate
            ? _value.registrationDate
            : registrationDate // ignore: cast_nullable_to_non_nullable
                  as String,
        registrarId: freezed == registrarId
            ? _value.registrarId
            : registrarId // ignore: cast_nullable_to_non_nullable
                  as String?,
        notes: null == notes
            ? _value.notes
            : notes // ignore: cast_nullable_to_non_nullable
                  as String,
        ownerId: freezed == ownerId
            ? _value.ownerId
            : ownerId // ignore: cast_nullable_to_non_nullable
                  as String?,
        techConditions: freezed == techConditions
            ? _value.techConditions
            : techConditions // ignore: cast_nullable_to_non_nullable
                  as String?,
        pripiska: freezed == pripiska
            ? _value.pripiska
            : pripiska // ignore: cast_nullable_to_non_nullable
                  as String?,
        reRegistrationDate: freezed == reRegistrationDate
            ? _value.reRegistrationDate
            : reRegistrationDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        pressure: null == pressure
            ? _value.pressure
            : pressure // ignore: cast_nullable_to_non_nullable
                  as double,
        testPressure: null == testPressure
            ? _value.testPressure
            : testPressure // ignore: cast_nullable_to_non_nullable
                  as double,
        rent: freezed == rent
            ? _value.rent
            : rent // ignore: cast_nullable_to_non_nullable
                  as String?,
        affiliationId: null == affiliationId
            ? _value.affiliationId
            : affiliationId // ignore: cast_nullable_to_non_nullable
                  as String,
        serviceLifeYears: null == serviceLifeYears
            ? _value.serviceLifeYears
            : serviceLifeYears // ignore: cast_nullable_to_non_nullable
                  as int,
        periodMajorRepair: freezed == periodMajorRepair
            ? _value.periodMajorRepair
            : periodMajorRepair // ignore: cast_nullable_to_non_nullable
                  as String?,
        periodPeriodicTest: freezed == periodPeriodicTest
            ? _value.periodPeriodicTest
            : periodPeriodicTest // ignore: cast_nullable_to_non_nullable
                  as String?,
        periodIntermediateTest: freezed == periodIntermediateTest
            ? _value.periodIntermediateTest
            : periodIntermediateTest // ignore: cast_nullable_to_non_nullable
                  as String?,
        periodDepotRepair: freezed == periodDepotRepair
            ? _value.periodDepotRepair
            : periodDepotRepair // ignore: cast_nullable_to_non_nullable
                  as String?,
        dangerClass: null == dangerClass
            ? _value.dangerClass
            : dangerClass // ignore: cast_nullable_to_non_nullable
                  as int,
        substance: null == substance
            ? _value.substance
            : substance // ignore: cast_nullable_to_non_nullable
                  as String,
        tareWeight2: null == tareWeight2
            ? _value.tareWeight2
            : tareWeight2 // ignore: cast_nullable_to_non_nullable
                  as double,
        tareWeight3: null == tareWeight3
            ? _value.tareWeight3
            : tareWeight3 // ignore: cast_nullable_to_non_nullable
                  as double,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$CreateRailwayCisternDTOImpl implements _CreateRailwayCisternDTO {
  const _$CreateRailwayCisternDTOImpl({
    required this.number,
    required this.manufacturerId,
    required this.buildDate,
    required this.tareWeight,
    required this.loadCapacity,
    required this.length,
    required this.axleCount,
    required this.volume,
    this.fillingVolume,
    this.initialTareWeight,
    required this.typeId,
    this.modelId,
    this.commissioningDate,
    required this.serialNumber,
    required this.registrationNumber,
    required this.registrationDate,
    this.registrarId,
    required this.notes,
    this.ownerId,
    this.techConditions,
    this.pripiska,
    this.reRegistrationDate,
    required this.pressure,
    required this.testPressure,
    this.rent,
    required this.affiliationId,
    required this.serviceLifeYears,
    this.periodMajorRepair,
    this.periodPeriodicTest,
    this.periodIntermediateTest,
    this.periodDepotRepair,
    required this.dangerClass,
    required this.substance,
    required this.tareWeight2,
    required this.tareWeight3,
  });

  factory _$CreateRailwayCisternDTOImpl.fromJson(Map<String, dynamic> json) =>
      _$$CreateRailwayCisternDTOImplFromJson(json);

  @override
  final String number;
  @override
  final String manufacturerId;
  @override
  final String buildDate;
  @override
  final double tareWeight;
  @override
  final double loadCapacity;
  @override
  final double length;
  @override
  final int axleCount;
  @override
  final double volume;
  @override
  final double? fillingVolume;
  @override
  final double? initialTareWeight;
  @override
  final String typeId;
  @override
  final String? modelId;
  @override
  final String? commissioningDate;
  @override
  final String serialNumber;
  @override
  final String registrationNumber;
  @override
  final String registrationDate;
  @override
  final String? registrarId;
  @override
  final String notes;
  @override
  final String? ownerId;
  @override
  final String? techConditions;
  @override
  final String? pripiska;
  @override
  final String? reRegistrationDate;
  @override
  final double pressure;
  @override
  final double testPressure;
  @override
  final String? rent;
  @override
  final String affiliationId;
  @override
  final int serviceLifeYears;
  @override
  final String? periodMajorRepair;
  @override
  final String? periodPeriodicTest;
  @override
  final String? periodIntermediateTest;
  @override
  final String? periodDepotRepair;
  @override
  final int dangerClass;
  @override
  final String substance;
  @override
  final double tareWeight2;
  @override
  final double tareWeight3;

  @override
  String toString() {
    return 'CreateRailwayCisternDTO(number: $number, manufacturerId: $manufacturerId, buildDate: $buildDate, tareWeight: $tareWeight, loadCapacity: $loadCapacity, length: $length, axleCount: $axleCount, volume: $volume, fillingVolume: $fillingVolume, initialTareWeight: $initialTareWeight, typeId: $typeId, modelId: $modelId, commissioningDate: $commissioningDate, serialNumber: $serialNumber, registrationNumber: $registrationNumber, registrationDate: $registrationDate, registrarId: $registrarId, notes: $notes, ownerId: $ownerId, techConditions: $techConditions, pripiska: $pripiska, reRegistrationDate: $reRegistrationDate, pressure: $pressure, testPressure: $testPressure, rent: $rent, affiliationId: $affiliationId, serviceLifeYears: $serviceLifeYears, periodMajorRepair: $periodMajorRepair, periodPeriodicTest: $periodPeriodicTest, periodIntermediateTest: $periodIntermediateTest, periodDepotRepair: $periodDepotRepair, dangerClass: $dangerClass, substance: $substance, tareWeight2: $tareWeight2, tareWeight3: $tareWeight3)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CreateRailwayCisternDTOImpl &&
            (identical(other.number, number) || other.number == number) &&
            (identical(other.manufacturerId, manufacturerId) ||
                other.manufacturerId == manufacturerId) &&
            (identical(other.buildDate, buildDate) ||
                other.buildDate == buildDate) &&
            (identical(other.tareWeight, tareWeight) ||
                other.tareWeight == tareWeight) &&
            (identical(other.loadCapacity, loadCapacity) ||
                other.loadCapacity == loadCapacity) &&
            (identical(other.length, length) || other.length == length) &&
            (identical(other.axleCount, axleCount) ||
                other.axleCount == axleCount) &&
            (identical(other.volume, volume) || other.volume == volume) &&
            (identical(other.fillingVolume, fillingVolume) ||
                other.fillingVolume == fillingVolume) &&
            (identical(other.initialTareWeight, initialTareWeight) ||
                other.initialTareWeight == initialTareWeight) &&
            (identical(other.typeId, typeId) || other.typeId == typeId) &&
            (identical(other.modelId, modelId) || other.modelId == modelId) &&
            (identical(other.commissioningDate, commissioningDate) ||
                other.commissioningDate == commissioningDate) &&
            (identical(other.serialNumber, serialNumber) ||
                other.serialNumber == serialNumber) &&
            (identical(other.registrationNumber, registrationNumber) ||
                other.registrationNumber == registrationNumber) &&
            (identical(other.registrationDate, registrationDate) ||
                other.registrationDate == registrationDate) &&
            (identical(other.registrarId, registrarId) ||
                other.registrarId == registrarId) &&
            (identical(other.notes, notes) || other.notes == notes) &&
            (identical(other.ownerId, ownerId) || other.ownerId == ownerId) &&
            (identical(other.techConditions, techConditions) ||
                other.techConditions == techConditions) &&
            (identical(other.pripiska, pripiska) ||
                other.pripiska == pripiska) &&
            (identical(other.reRegistrationDate, reRegistrationDate) ||
                other.reRegistrationDate == reRegistrationDate) &&
            (identical(other.pressure, pressure) ||
                other.pressure == pressure) &&
            (identical(other.testPressure, testPressure) ||
                other.testPressure == testPressure) &&
            (identical(other.rent, rent) || other.rent == rent) &&
            (identical(other.affiliationId, affiliationId) ||
                other.affiliationId == affiliationId) &&
            (identical(other.serviceLifeYears, serviceLifeYears) ||
                other.serviceLifeYears == serviceLifeYears) &&
            (identical(other.periodMajorRepair, periodMajorRepair) ||
                other.periodMajorRepair == periodMajorRepair) &&
            (identical(other.periodPeriodicTest, periodPeriodicTest) ||
                other.periodPeriodicTest == periodPeriodicTest) &&
            (identical(other.periodIntermediateTest, periodIntermediateTest) ||
                other.periodIntermediateTest == periodIntermediateTest) &&
            (identical(other.periodDepotRepair, periodDepotRepair) ||
                other.periodDepotRepair == periodDepotRepair) &&
            (identical(other.dangerClass, dangerClass) ||
                other.dangerClass == dangerClass) &&
            (identical(other.substance, substance) ||
                other.substance == substance) &&
            (identical(other.tareWeight2, tareWeight2) ||
                other.tareWeight2 == tareWeight2) &&
            (identical(other.tareWeight3, tareWeight3) ||
                other.tareWeight3 == tareWeight3));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hashAll([
    runtimeType,
    number,
    manufacturerId,
    buildDate,
    tareWeight,
    loadCapacity,
    length,
    axleCount,
    volume,
    fillingVolume,
    initialTareWeight,
    typeId,
    modelId,
    commissioningDate,
    serialNumber,
    registrationNumber,
    registrationDate,
    registrarId,
    notes,
    ownerId,
    techConditions,
    pripiska,
    reRegistrationDate,
    pressure,
    testPressure,
    rent,
    affiliationId,
    serviceLifeYears,
    periodMajorRepair,
    periodPeriodicTest,
    periodIntermediateTest,
    periodDepotRepair,
    dangerClass,
    substance,
    tareWeight2,
    tareWeight3,
  ]);

  /// Create a copy of CreateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CreateRailwayCisternDTOImplCopyWith<_$CreateRailwayCisternDTOImpl>
  get copyWith =>
      __$$CreateRailwayCisternDTOImplCopyWithImpl<
        _$CreateRailwayCisternDTOImpl
      >(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CreateRailwayCisternDTOImplToJson(this);
  }
}

abstract class _CreateRailwayCisternDTO implements CreateRailwayCisternDTO {
  const factory _CreateRailwayCisternDTO({
    required final String number,
    required final String manufacturerId,
    required final String buildDate,
    required final double tareWeight,
    required final double loadCapacity,
    required final double length,
    required final int axleCount,
    required final double volume,
    final double? fillingVolume,
    final double? initialTareWeight,
    required final String typeId,
    final String? modelId,
    final String? commissioningDate,
    required final String serialNumber,
    required final String registrationNumber,
    required final String registrationDate,
    final String? registrarId,
    required final String notes,
    final String? ownerId,
    final String? techConditions,
    final String? pripiska,
    final String? reRegistrationDate,
    required final double pressure,
    required final double testPressure,
    final String? rent,
    required final String affiliationId,
    required final int serviceLifeYears,
    final String? periodMajorRepair,
    final String? periodPeriodicTest,
    final String? periodIntermediateTest,
    final String? periodDepotRepair,
    required final int dangerClass,
    required final String substance,
    required final double tareWeight2,
    required final double tareWeight3,
  }) = _$CreateRailwayCisternDTOImpl;

  factory _CreateRailwayCisternDTO.fromJson(Map<String, dynamic> json) =
      _$CreateRailwayCisternDTOImpl.fromJson;

  @override
  String get number;
  @override
  String get manufacturerId;
  @override
  String get buildDate;
  @override
  double get tareWeight;
  @override
  double get loadCapacity;
  @override
  double get length;
  @override
  int get axleCount;
  @override
  double get volume;
  @override
  double? get fillingVolume;
  @override
  double? get initialTareWeight;
  @override
  String get typeId;
  @override
  String? get modelId;
  @override
  String? get commissioningDate;
  @override
  String get serialNumber;
  @override
  String get registrationNumber;
  @override
  String get registrationDate;
  @override
  String? get registrarId;
  @override
  String get notes;
  @override
  String? get ownerId;
  @override
  String? get techConditions;
  @override
  String? get pripiska;
  @override
  String? get reRegistrationDate;
  @override
  double get pressure;
  @override
  double get testPressure;
  @override
  String? get rent;
  @override
  String get affiliationId;
  @override
  int get serviceLifeYears;
  @override
  String? get periodMajorRepair;
  @override
  String? get periodPeriodicTest;
  @override
  String? get periodIntermediateTest;
  @override
  String? get periodDepotRepair;
  @override
  int get dangerClass;
  @override
  String get substance;
  @override
  double get tareWeight2;
  @override
  double get tareWeight3;

  /// Create a copy of CreateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CreateRailwayCisternDTOImplCopyWith<_$CreateRailwayCisternDTOImpl>
  get copyWith => throw _privateConstructorUsedError;
}

UpdateRailwayCisternDTO _$UpdateRailwayCisternDTOFromJson(
  Map<String, dynamic> json,
) {
  return _UpdateRailwayCisternDTO.fromJson(json);
}

/// @nodoc
mixin _$UpdateRailwayCisternDTO {
  String get id => throw _privateConstructorUsedError;
  String get number => throw _privateConstructorUsedError;
  String get manufacturerId => throw _privateConstructorUsedError;
  String get buildDate => throw _privateConstructorUsedError;
  double get tareWeight => throw _privateConstructorUsedError;
  double get loadCapacity => throw _privateConstructorUsedError;
  double get length => throw _privateConstructorUsedError;
  int get axleCount => throw _privateConstructorUsedError;
  double get volume => throw _privateConstructorUsedError;
  double? get fillingVolume => throw _privateConstructorUsedError;
  double? get initialTareWeight => throw _privateConstructorUsedError;
  String get typeId => throw _privateConstructorUsedError;
  String? get modelId => throw _privateConstructorUsedError;
  String? get commissioningDate => throw _privateConstructorUsedError;
  String get serialNumber => throw _privateConstructorUsedError;
  String get registrationNumber => throw _privateConstructorUsedError;
  String get registrationDate => throw _privateConstructorUsedError;
  String? get registrarId => throw _privateConstructorUsedError;
  String get notes => throw _privateConstructorUsedError;
  String? get ownerId => throw _privateConstructorUsedError;
  String? get techConditions => throw _privateConstructorUsedError;
  String? get pripiska => throw _privateConstructorUsedError;
  String? get reRegistrationDate => throw _privateConstructorUsedError;
  double get pressure => throw _privateConstructorUsedError;
  double get testPressure => throw _privateConstructorUsedError;
  String? get rent => throw _privateConstructorUsedError;
  String get affiliationId => throw _privateConstructorUsedError;
  int get serviceLifeYears => throw _privateConstructorUsedError;
  String? get periodMajorRepair => throw _privateConstructorUsedError;
  String? get periodPeriodicTest => throw _privateConstructorUsedError;
  String? get periodIntermediateTest => throw _privateConstructorUsedError;
  String? get periodDepotRepair => throw _privateConstructorUsedError;
  int get dangerClass => throw _privateConstructorUsedError;
  String get substance => throw _privateConstructorUsedError;
  double get tareWeight2 => throw _privateConstructorUsedError;
  double get tareWeight3 => throw _privateConstructorUsedError;

  /// Serializes this UpdateRailwayCisternDTO to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of UpdateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $UpdateRailwayCisternDTOCopyWith<UpdateRailwayCisternDTO> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UpdateRailwayCisternDTOCopyWith<$Res> {
  factory $UpdateRailwayCisternDTOCopyWith(
    UpdateRailwayCisternDTO value,
    $Res Function(UpdateRailwayCisternDTO) then,
  ) = _$UpdateRailwayCisternDTOCopyWithImpl<$Res, UpdateRailwayCisternDTO>;
  @useResult
  $Res call({
    String id,
    String number,
    String manufacturerId,
    String buildDate,
    double tareWeight,
    double loadCapacity,
    double length,
    int axleCount,
    double volume,
    double? fillingVolume,
    double? initialTareWeight,
    String typeId,
    String? modelId,
    String? commissioningDate,
    String serialNumber,
    String registrationNumber,
    String registrationDate,
    String? registrarId,
    String notes,
    String? ownerId,
    String? techConditions,
    String? pripiska,
    String? reRegistrationDate,
    double pressure,
    double testPressure,
    String? rent,
    String affiliationId,
    int serviceLifeYears,
    String? periodMajorRepair,
    String? periodPeriodicTest,
    String? periodIntermediateTest,
    String? periodDepotRepair,
    int dangerClass,
    String substance,
    double tareWeight2,
    double tareWeight3,
  });
}

/// @nodoc
class _$UpdateRailwayCisternDTOCopyWithImpl<
  $Res,
  $Val extends UpdateRailwayCisternDTO
>
    implements $UpdateRailwayCisternDTOCopyWith<$Res> {
  _$UpdateRailwayCisternDTOCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of UpdateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? number = null,
    Object? manufacturerId = null,
    Object? buildDate = null,
    Object? tareWeight = null,
    Object? loadCapacity = null,
    Object? length = null,
    Object? axleCount = null,
    Object? volume = null,
    Object? fillingVolume = freezed,
    Object? initialTareWeight = freezed,
    Object? typeId = null,
    Object? modelId = freezed,
    Object? commissioningDate = freezed,
    Object? serialNumber = null,
    Object? registrationNumber = null,
    Object? registrationDate = null,
    Object? registrarId = freezed,
    Object? notes = null,
    Object? ownerId = freezed,
    Object? techConditions = freezed,
    Object? pripiska = freezed,
    Object? reRegistrationDate = freezed,
    Object? pressure = null,
    Object? testPressure = null,
    Object? rent = freezed,
    Object? affiliationId = null,
    Object? serviceLifeYears = null,
    Object? periodMajorRepair = freezed,
    Object? periodPeriodicTest = freezed,
    Object? periodIntermediateTest = freezed,
    Object? periodDepotRepair = freezed,
    Object? dangerClass = null,
    Object? substance = null,
    Object? tareWeight2 = null,
    Object? tareWeight3 = null,
  }) {
    return _then(
      _value.copyWith(
            id: null == id
                ? _value.id
                : id // ignore: cast_nullable_to_non_nullable
                      as String,
            number: null == number
                ? _value.number
                : number // ignore: cast_nullable_to_non_nullable
                      as String,
            manufacturerId: null == manufacturerId
                ? _value.manufacturerId
                : manufacturerId // ignore: cast_nullable_to_non_nullable
                      as String,
            buildDate: null == buildDate
                ? _value.buildDate
                : buildDate // ignore: cast_nullable_to_non_nullable
                      as String,
            tareWeight: null == tareWeight
                ? _value.tareWeight
                : tareWeight // ignore: cast_nullable_to_non_nullable
                      as double,
            loadCapacity: null == loadCapacity
                ? _value.loadCapacity
                : loadCapacity // ignore: cast_nullable_to_non_nullable
                      as double,
            length: null == length
                ? _value.length
                : length // ignore: cast_nullable_to_non_nullable
                      as double,
            axleCount: null == axleCount
                ? _value.axleCount
                : axleCount // ignore: cast_nullable_to_non_nullable
                      as int,
            volume: null == volume
                ? _value.volume
                : volume // ignore: cast_nullable_to_non_nullable
                      as double,
            fillingVolume: freezed == fillingVolume
                ? _value.fillingVolume
                : fillingVolume // ignore: cast_nullable_to_non_nullable
                      as double?,
            initialTareWeight: freezed == initialTareWeight
                ? _value.initialTareWeight
                : initialTareWeight // ignore: cast_nullable_to_non_nullable
                      as double?,
            typeId: null == typeId
                ? _value.typeId
                : typeId // ignore: cast_nullable_to_non_nullable
                      as String,
            modelId: freezed == modelId
                ? _value.modelId
                : modelId // ignore: cast_nullable_to_non_nullable
                      as String?,
            commissioningDate: freezed == commissioningDate
                ? _value.commissioningDate
                : commissioningDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            serialNumber: null == serialNumber
                ? _value.serialNumber
                : serialNumber // ignore: cast_nullable_to_non_nullable
                      as String,
            registrationNumber: null == registrationNumber
                ? _value.registrationNumber
                : registrationNumber // ignore: cast_nullable_to_non_nullable
                      as String,
            registrationDate: null == registrationDate
                ? _value.registrationDate
                : registrationDate // ignore: cast_nullable_to_non_nullable
                      as String,
            registrarId: freezed == registrarId
                ? _value.registrarId
                : registrarId // ignore: cast_nullable_to_non_nullable
                      as String?,
            notes: null == notes
                ? _value.notes
                : notes // ignore: cast_nullable_to_non_nullable
                      as String,
            ownerId: freezed == ownerId
                ? _value.ownerId
                : ownerId // ignore: cast_nullable_to_non_nullable
                      as String?,
            techConditions: freezed == techConditions
                ? _value.techConditions
                : techConditions // ignore: cast_nullable_to_non_nullable
                      as String?,
            pripiska: freezed == pripiska
                ? _value.pripiska
                : pripiska // ignore: cast_nullable_to_non_nullable
                      as String?,
            reRegistrationDate: freezed == reRegistrationDate
                ? _value.reRegistrationDate
                : reRegistrationDate // ignore: cast_nullable_to_non_nullable
                      as String?,
            pressure: null == pressure
                ? _value.pressure
                : pressure // ignore: cast_nullable_to_non_nullable
                      as double,
            testPressure: null == testPressure
                ? _value.testPressure
                : testPressure // ignore: cast_nullable_to_non_nullable
                      as double,
            rent: freezed == rent
                ? _value.rent
                : rent // ignore: cast_nullable_to_non_nullable
                      as String?,
            affiliationId: null == affiliationId
                ? _value.affiliationId
                : affiliationId // ignore: cast_nullable_to_non_nullable
                      as String,
            serviceLifeYears: null == serviceLifeYears
                ? _value.serviceLifeYears
                : serviceLifeYears // ignore: cast_nullable_to_non_nullable
                      as int,
            periodMajorRepair: freezed == periodMajorRepair
                ? _value.periodMajorRepair
                : periodMajorRepair // ignore: cast_nullable_to_non_nullable
                      as String?,
            periodPeriodicTest: freezed == periodPeriodicTest
                ? _value.periodPeriodicTest
                : periodPeriodicTest // ignore: cast_nullable_to_non_nullable
                      as String?,
            periodIntermediateTest: freezed == periodIntermediateTest
                ? _value.periodIntermediateTest
                : periodIntermediateTest // ignore: cast_nullable_to_non_nullable
                      as String?,
            periodDepotRepair: freezed == periodDepotRepair
                ? _value.periodDepotRepair
                : periodDepotRepair // ignore: cast_nullable_to_non_nullable
                      as String?,
            dangerClass: null == dangerClass
                ? _value.dangerClass
                : dangerClass // ignore: cast_nullable_to_non_nullable
                      as int,
            substance: null == substance
                ? _value.substance
                : substance // ignore: cast_nullable_to_non_nullable
                      as String,
            tareWeight2: null == tareWeight2
                ? _value.tareWeight2
                : tareWeight2 // ignore: cast_nullable_to_non_nullable
                      as double,
            tareWeight3: null == tareWeight3
                ? _value.tareWeight3
                : tareWeight3 // ignore: cast_nullable_to_non_nullable
                      as double,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$UpdateRailwayCisternDTOImplCopyWith<$Res>
    implements $UpdateRailwayCisternDTOCopyWith<$Res> {
  factory _$$UpdateRailwayCisternDTOImplCopyWith(
    _$UpdateRailwayCisternDTOImpl value,
    $Res Function(_$UpdateRailwayCisternDTOImpl) then,
  ) = __$$UpdateRailwayCisternDTOImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String id,
    String number,
    String manufacturerId,
    String buildDate,
    double tareWeight,
    double loadCapacity,
    double length,
    int axleCount,
    double volume,
    double? fillingVolume,
    double? initialTareWeight,
    String typeId,
    String? modelId,
    String? commissioningDate,
    String serialNumber,
    String registrationNumber,
    String registrationDate,
    String? registrarId,
    String notes,
    String? ownerId,
    String? techConditions,
    String? pripiska,
    String? reRegistrationDate,
    double pressure,
    double testPressure,
    String? rent,
    String affiliationId,
    int serviceLifeYears,
    String? periodMajorRepair,
    String? periodPeriodicTest,
    String? periodIntermediateTest,
    String? periodDepotRepair,
    int dangerClass,
    String substance,
    double tareWeight2,
    double tareWeight3,
  });
}

/// @nodoc
class __$$UpdateRailwayCisternDTOImplCopyWithImpl<$Res>
    extends
        _$UpdateRailwayCisternDTOCopyWithImpl<
          $Res,
          _$UpdateRailwayCisternDTOImpl
        >
    implements _$$UpdateRailwayCisternDTOImplCopyWith<$Res> {
  __$$UpdateRailwayCisternDTOImplCopyWithImpl(
    _$UpdateRailwayCisternDTOImpl _value,
    $Res Function(_$UpdateRailwayCisternDTOImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of UpdateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? number = null,
    Object? manufacturerId = null,
    Object? buildDate = null,
    Object? tareWeight = null,
    Object? loadCapacity = null,
    Object? length = null,
    Object? axleCount = null,
    Object? volume = null,
    Object? fillingVolume = freezed,
    Object? initialTareWeight = freezed,
    Object? typeId = null,
    Object? modelId = freezed,
    Object? commissioningDate = freezed,
    Object? serialNumber = null,
    Object? registrationNumber = null,
    Object? registrationDate = null,
    Object? registrarId = freezed,
    Object? notes = null,
    Object? ownerId = freezed,
    Object? techConditions = freezed,
    Object? pripiska = freezed,
    Object? reRegistrationDate = freezed,
    Object? pressure = null,
    Object? testPressure = null,
    Object? rent = freezed,
    Object? affiliationId = null,
    Object? serviceLifeYears = null,
    Object? periodMajorRepair = freezed,
    Object? periodPeriodicTest = freezed,
    Object? periodIntermediateTest = freezed,
    Object? periodDepotRepair = freezed,
    Object? dangerClass = null,
    Object? substance = null,
    Object? tareWeight2 = null,
    Object? tareWeight3 = null,
  }) {
    return _then(
      _$UpdateRailwayCisternDTOImpl(
        id: null == id
            ? _value.id
            : id // ignore: cast_nullable_to_non_nullable
                  as String,
        number: null == number
            ? _value.number
            : number // ignore: cast_nullable_to_non_nullable
                  as String,
        manufacturerId: null == manufacturerId
            ? _value.manufacturerId
            : manufacturerId // ignore: cast_nullable_to_non_nullable
                  as String,
        buildDate: null == buildDate
            ? _value.buildDate
            : buildDate // ignore: cast_nullable_to_non_nullable
                  as String,
        tareWeight: null == tareWeight
            ? _value.tareWeight
            : tareWeight // ignore: cast_nullable_to_non_nullable
                  as double,
        loadCapacity: null == loadCapacity
            ? _value.loadCapacity
            : loadCapacity // ignore: cast_nullable_to_non_nullable
                  as double,
        length: null == length
            ? _value.length
            : length // ignore: cast_nullable_to_non_nullable
                  as double,
        axleCount: null == axleCount
            ? _value.axleCount
            : axleCount // ignore: cast_nullable_to_non_nullable
                  as int,
        volume: null == volume
            ? _value.volume
            : volume // ignore: cast_nullable_to_non_nullable
                  as double,
        fillingVolume: freezed == fillingVolume
            ? _value.fillingVolume
            : fillingVolume // ignore: cast_nullable_to_non_nullable
                  as double?,
        initialTareWeight: freezed == initialTareWeight
            ? _value.initialTareWeight
            : initialTareWeight // ignore: cast_nullable_to_non_nullable
                  as double?,
        typeId: null == typeId
            ? _value.typeId
            : typeId // ignore: cast_nullable_to_non_nullable
                  as String,
        modelId: freezed == modelId
            ? _value.modelId
            : modelId // ignore: cast_nullable_to_non_nullable
                  as String?,
        commissioningDate: freezed == commissioningDate
            ? _value.commissioningDate
            : commissioningDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        serialNumber: null == serialNumber
            ? _value.serialNumber
            : serialNumber // ignore: cast_nullable_to_non_nullable
                  as String,
        registrationNumber: null == registrationNumber
            ? _value.registrationNumber
            : registrationNumber // ignore: cast_nullable_to_non_nullable
                  as String,
        registrationDate: null == registrationDate
            ? _value.registrationDate
            : registrationDate // ignore: cast_nullable_to_non_nullable
                  as String,
        registrarId: freezed == registrarId
            ? _value.registrarId
            : registrarId // ignore: cast_nullable_to_non_nullable
                  as String?,
        notes: null == notes
            ? _value.notes
            : notes // ignore: cast_nullable_to_non_nullable
                  as String,
        ownerId: freezed == ownerId
            ? _value.ownerId
            : ownerId // ignore: cast_nullable_to_non_nullable
                  as String?,
        techConditions: freezed == techConditions
            ? _value.techConditions
            : techConditions // ignore: cast_nullable_to_non_nullable
                  as String?,
        pripiska: freezed == pripiska
            ? _value.pripiska
            : pripiska // ignore: cast_nullable_to_non_nullable
                  as String?,
        reRegistrationDate: freezed == reRegistrationDate
            ? _value.reRegistrationDate
            : reRegistrationDate // ignore: cast_nullable_to_non_nullable
                  as String?,
        pressure: null == pressure
            ? _value.pressure
            : pressure // ignore: cast_nullable_to_non_nullable
                  as double,
        testPressure: null == testPressure
            ? _value.testPressure
            : testPressure // ignore: cast_nullable_to_non_nullable
                  as double,
        rent: freezed == rent
            ? _value.rent
            : rent // ignore: cast_nullable_to_non_nullable
                  as String?,
        affiliationId: null == affiliationId
            ? _value.affiliationId
            : affiliationId // ignore: cast_nullable_to_non_nullable
                  as String,
        serviceLifeYears: null == serviceLifeYears
            ? _value.serviceLifeYears
            : serviceLifeYears // ignore: cast_nullable_to_non_nullable
                  as int,
        periodMajorRepair: freezed == periodMajorRepair
            ? _value.periodMajorRepair
            : periodMajorRepair // ignore: cast_nullable_to_non_nullable
                  as String?,
        periodPeriodicTest: freezed == periodPeriodicTest
            ? _value.periodPeriodicTest
            : periodPeriodicTest // ignore: cast_nullable_to_non_nullable
                  as String?,
        periodIntermediateTest: freezed == periodIntermediateTest
            ? _value.periodIntermediateTest
            : periodIntermediateTest // ignore: cast_nullable_to_non_nullable
                  as String?,
        periodDepotRepair: freezed == periodDepotRepair
            ? _value.periodDepotRepair
            : periodDepotRepair // ignore: cast_nullable_to_non_nullable
                  as String?,
        dangerClass: null == dangerClass
            ? _value.dangerClass
            : dangerClass // ignore: cast_nullable_to_non_nullable
                  as int,
        substance: null == substance
            ? _value.substance
            : substance // ignore: cast_nullable_to_non_nullable
                  as String,
        tareWeight2: null == tareWeight2
            ? _value.tareWeight2
            : tareWeight2 // ignore: cast_nullable_to_non_nullable
                  as double,
        tareWeight3: null == tareWeight3
            ? _value.tareWeight3
            : tareWeight3 // ignore: cast_nullable_to_non_nullable
                  as double,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$UpdateRailwayCisternDTOImpl implements _UpdateRailwayCisternDTO {
  const _$UpdateRailwayCisternDTOImpl({
    required this.id,
    required this.number,
    required this.manufacturerId,
    required this.buildDate,
    required this.tareWeight,
    required this.loadCapacity,
    required this.length,
    required this.axleCount,
    required this.volume,
    this.fillingVolume,
    this.initialTareWeight,
    required this.typeId,
    this.modelId,
    this.commissioningDate,
    required this.serialNumber,
    required this.registrationNumber,
    required this.registrationDate,
    this.registrarId,
    required this.notes,
    this.ownerId,
    this.techConditions,
    this.pripiska,
    this.reRegistrationDate,
    required this.pressure,
    required this.testPressure,
    this.rent,
    required this.affiliationId,
    required this.serviceLifeYears,
    this.periodMajorRepair,
    this.periodPeriodicTest,
    this.periodIntermediateTest,
    this.periodDepotRepair,
    required this.dangerClass,
    required this.substance,
    required this.tareWeight2,
    required this.tareWeight3,
  });

  factory _$UpdateRailwayCisternDTOImpl.fromJson(Map<String, dynamic> json) =>
      _$$UpdateRailwayCisternDTOImplFromJson(json);

  @override
  final String id;
  @override
  final String number;
  @override
  final String manufacturerId;
  @override
  final String buildDate;
  @override
  final double tareWeight;
  @override
  final double loadCapacity;
  @override
  final double length;
  @override
  final int axleCount;
  @override
  final double volume;
  @override
  final double? fillingVolume;
  @override
  final double? initialTareWeight;
  @override
  final String typeId;
  @override
  final String? modelId;
  @override
  final String? commissioningDate;
  @override
  final String serialNumber;
  @override
  final String registrationNumber;
  @override
  final String registrationDate;
  @override
  final String? registrarId;
  @override
  final String notes;
  @override
  final String? ownerId;
  @override
  final String? techConditions;
  @override
  final String? pripiska;
  @override
  final String? reRegistrationDate;
  @override
  final double pressure;
  @override
  final double testPressure;
  @override
  final String? rent;
  @override
  final String affiliationId;
  @override
  final int serviceLifeYears;
  @override
  final String? periodMajorRepair;
  @override
  final String? periodPeriodicTest;
  @override
  final String? periodIntermediateTest;
  @override
  final String? periodDepotRepair;
  @override
  final int dangerClass;
  @override
  final String substance;
  @override
  final double tareWeight2;
  @override
  final double tareWeight3;

  @override
  String toString() {
    return 'UpdateRailwayCisternDTO(id: $id, number: $number, manufacturerId: $manufacturerId, buildDate: $buildDate, tareWeight: $tareWeight, loadCapacity: $loadCapacity, length: $length, axleCount: $axleCount, volume: $volume, fillingVolume: $fillingVolume, initialTareWeight: $initialTareWeight, typeId: $typeId, modelId: $modelId, commissioningDate: $commissioningDate, serialNumber: $serialNumber, registrationNumber: $registrationNumber, registrationDate: $registrationDate, registrarId: $registrarId, notes: $notes, ownerId: $ownerId, techConditions: $techConditions, pripiska: $pripiska, reRegistrationDate: $reRegistrationDate, pressure: $pressure, testPressure: $testPressure, rent: $rent, affiliationId: $affiliationId, serviceLifeYears: $serviceLifeYears, periodMajorRepair: $periodMajorRepair, periodPeriodicTest: $periodPeriodicTest, periodIntermediateTest: $periodIntermediateTest, periodDepotRepair: $periodDepotRepair, dangerClass: $dangerClass, substance: $substance, tareWeight2: $tareWeight2, tareWeight3: $tareWeight3)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$UpdateRailwayCisternDTOImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.number, number) || other.number == number) &&
            (identical(other.manufacturerId, manufacturerId) ||
                other.manufacturerId == manufacturerId) &&
            (identical(other.buildDate, buildDate) ||
                other.buildDate == buildDate) &&
            (identical(other.tareWeight, tareWeight) ||
                other.tareWeight == tareWeight) &&
            (identical(other.loadCapacity, loadCapacity) ||
                other.loadCapacity == loadCapacity) &&
            (identical(other.length, length) || other.length == length) &&
            (identical(other.axleCount, axleCount) ||
                other.axleCount == axleCount) &&
            (identical(other.volume, volume) || other.volume == volume) &&
            (identical(other.fillingVolume, fillingVolume) ||
                other.fillingVolume == fillingVolume) &&
            (identical(other.initialTareWeight, initialTareWeight) ||
                other.initialTareWeight == initialTareWeight) &&
            (identical(other.typeId, typeId) || other.typeId == typeId) &&
            (identical(other.modelId, modelId) || other.modelId == modelId) &&
            (identical(other.commissioningDate, commissioningDate) ||
                other.commissioningDate == commissioningDate) &&
            (identical(other.serialNumber, serialNumber) ||
                other.serialNumber == serialNumber) &&
            (identical(other.registrationNumber, registrationNumber) ||
                other.registrationNumber == registrationNumber) &&
            (identical(other.registrationDate, registrationDate) ||
                other.registrationDate == registrationDate) &&
            (identical(other.registrarId, registrarId) ||
                other.registrarId == registrarId) &&
            (identical(other.notes, notes) || other.notes == notes) &&
            (identical(other.ownerId, ownerId) || other.ownerId == ownerId) &&
            (identical(other.techConditions, techConditions) ||
                other.techConditions == techConditions) &&
            (identical(other.pripiska, pripiska) ||
                other.pripiska == pripiska) &&
            (identical(other.reRegistrationDate, reRegistrationDate) ||
                other.reRegistrationDate == reRegistrationDate) &&
            (identical(other.pressure, pressure) ||
                other.pressure == pressure) &&
            (identical(other.testPressure, testPressure) ||
                other.testPressure == testPressure) &&
            (identical(other.rent, rent) || other.rent == rent) &&
            (identical(other.affiliationId, affiliationId) ||
                other.affiliationId == affiliationId) &&
            (identical(other.serviceLifeYears, serviceLifeYears) ||
                other.serviceLifeYears == serviceLifeYears) &&
            (identical(other.periodMajorRepair, periodMajorRepair) ||
                other.periodMajorRepair == periodMajorRepair) &&
            (identical(other.periodPeriodicTest, periodPeriodicTest) ||
                other.periodPeriodicTest == periodPeriodicTest) &&
            (identical(other.periodIntermediateTest, periodIntermediateTest) ||
                other.periodIntermediateTest == periodIntermediateTest) &&
            (identical(other.periodDepotRepair, periodDepotRepair) ||
                other.periodDepotRepair == periodDepotRepair) &&
            (identical(other.dangerClass, dangerClass) ||
                other.dangerClass == dangerClass) &&
            (identical(other.substance, substance) ||
                other.substance == substance) &&
            (identical(other.tareWeight2, tareWeight2) ||
                other.tareWeight2 == tareWeight2) &&
            (identical(other.tareWeight3, tareWeight3) ||
                other.tareWeight3 == tareWeight3));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hashAll([
    runtimeType,
    id,
    number,
    manufacturerId,
    buildDate,
    tareWeight,
    loadCapacity,
    length,
    axleCount,
    volume,
    fillingVolume,
    initialTareWeight,
    typeId,
    modelId,
    commissioningDate,
    serialNumber,
    registrationNumber,
    registrationDate,
    registrarId,
    notes,
    ownerId,
    techConditions,
    pripiska,
    reRegistrationDate,
    pressure,
    testPressure,
    rent,
    affiliationId,
    serviceLifeYears,
    periodMajorRepair,
    periodPeriodicTest,
    periodIntermediateTest,
    periodDepotRepair,
    dangerClass,
    substance,
    tareWeight2,
    tareWeight3,
  ]);

  /// Create a copy of UpdateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$UpdateRailwayCisternDTOImplCopyWith<_$UpdateRailwayCisternDTOImpl>
  get copyWith =>
      __$$UpdateRailwayCisternDTOImplCopyWithImpl<
        _$UpdateRailwayCisternDTOImpl
      >(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$UpdateRailwayCisternDTOImplToJson(this);
  }
}

abstract class _UpdateRailwayCisternDTO implements UpdateRailwayCisternDTO {
  const factory _UpdateRailwayCisternDTO({
    required final String id,
    required final String number,
    required final String manufacturerId,
    required final String buildDate,
    required final double tareWeight,
    required final double loadCapacity,
    required final double length,
    required final int axleCount,
    required final double volume,
    final double? fillingVolume,
    final double? initialTareWeight,
    required final String typeId,
    final String? modelId,
    final String? commissioningDate,
    required final String serialNumber,
    required final String registrationNumber,
    required final String registrationDate,
    final String? registrarId,
    required final String notes,
    final String? ownerId,
    final String? techConditions,
    final String? pripiska,
    final String? reRegistrationDate,
    required final double pressure,
    required final double testPressure,
    final String? rent,
    required final String affiliationId,
    required final int serviceLifeYears,
    final String? periodMajorRepair,
    final String? periodPeriodicTest,
    final String? periodIntermediateTest,
    final String? periodDepotRepair,
    required final int dangerClass,
    required final String substance,
    required final double tareWeight2,
    required final double tareWeight3,
  }) = _$UpdateRailwayCisternDTOImpl;

  factory _UpdateRailwayCisternDTO.fromJson(Map<String, dynamic> json) =
      _$UpdateRailwayCisternDTOImpl.fromJson;

  @override
  String get id;
  @override
  String get number;
  @override
  String get manufacturerId;
  @override
  String get buildDate;
  @override
  double get tareWeight;
  @override
  double get loadCapacity;
  @override
  double get length;
  @override
  int get axleCount;
  @override
  double get volume;
  @override
  double? get fillingVolume;
  @override
  double? get initialTareWeight;
  @override
  String get typeId;
  @override
  String? get modelId;
  @override
  String? get commissioningDate;
  @override
  String get serialNumber;
  @override
  String get registrationNumber;
  @override
  String get registrationDate;
  @override
  String? get registrarId;
  @override
  String get notes;
  @override
  String? get ownerId;
  @override
  String? get techConditions;
  @override
  String? get pripiska;
  @override
  String? get reRegistrationDate;
  @override
  double get pressure;
  @override
  double get testPressure;
  @override
  String? get rent;
  @override
  String get affiliationId;
  @override
  int get serviceLifeYears;
  @override
  String? get periodMajorRepair;
  @override
  String? get periodPeriodicTest;
  @override
  String? get periodIntermediateTest;
  @override
  String? get periodDepotRepair;
  @override
  int get dangerClass;
  @override
  String get substance;
  @override
  double get tareWeight2;
  @override
  double get tareWeight3;

  /// Create a copy of UpdateRailwayCisternDTO
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$UpdateRailwayCisternDTOImplCopyWith<_$UpdateRailwayCisternDTOImpl>
  get copyWith => throw _privateConstructorUsedError;
}

CisternsFilter _$CisternsFilterFromJson(Map<String, dynamic> json) {
  return _CisternsFilter.fromJson(json);
}

/// @nodoc
mixin _$CisternsFilter {
  String? get search => throw _privateConstructorUsedError;
  String? get manufacturerId => throw _privateConstructorUsedError;
  String? get typeId => throw _privateConstructorUsedError;
  String? get ownerId => throw _privateConstructorUsedError;
  String? get affiliationId => throw _privateConstructorUsedError;
  int? get page => throw _privateConstructorUsedError;
  int? get pageSize => throw _privateConstructorUsedError;

  /// Serializes this CisternsFilter to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CisternsFilter
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CisternsFilterCopyWith<CisternsFilter> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CisternsFilterCopyWith<$Res> {
  factory $CisternsFilterCopyWith(
    CisternsFilter value,
    $Res Function(CisternsFilter) then,
  ) = _$CisternsFilterCopyWithImpl<$Res, CisternsFilter>;
  @useResult
  $Res call({
    String? search,
    String? manufacturerId,
    String? typeId,
    String? ownerId,
    String? affiliationId,
    int? page,
    int? pageSize,
  });
}

/// @nodoc
class _$CisternsFilterCopyWithImpl<$Res, $Val extends CisternsFilter>
    implements $CisternsFilterCopyWith<$Res> {
  _$CisternsFilterCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CisternsFilter
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? search = freezed,
    Object? manufacturerId = freezed,
    Object? typeId = freezed,
    Object? ownerId = freezed,
    Object? affiliationId = freezed,
    Object? page = freezed,
    Object? pageSize = freezed,
  }) {
    return _then(
      _value.copyWith(
            search: freezed == search
                ? _value.search
                : search // ignore: cast_nullable_to_non_nullable
                      as String?,
            manufacturerId: freezed == manufacturerId
                ? _value.manufacturerId
                : manufacturerId // ignore: cast_nullable_to_non_nullable
                      as String?,
            typeId: freezed == typeId
                ? _value.typeId
                : typeId // ignore: cast_nullable_to_non_nullable
                      as String?,
            ownerId: freezed == ownerId
                ? _value.ownerId
                : ownerId // ignore: cast_nullable_to_non_nullable
                      as String?,
            affiliationId: freezed == affiliationId
                ? _value.affiliationId
                : affiliationId // ignore: cast_nullable_to_non_nullable
                      as String?,
            page: freezed == page
                ? _value.page
                : page // ignore: cast_nullable_to_non_nullable
                      as int?,
            pageSize: freezed == pageSize
                ? _value.pageSize
                : pageSize // ignore: cast_nullable_to_non_nullable
                      as int?,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$CisternsFilterImplCopyWith<$Res>
    implements $CisternsFilterCopyWith<$Res> {
  factory _$$CisternsFilterImplCopyWith(
    _$CisternsFilterImpl value,
    $Res Function(_$CisternsFilterImpl) then,
  ) = __$$CisternsFilterImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    String? search,
    String? manufacturerId,
    String? typeId,
    String? ownerId,
    String? affiliationId,
    int? page,
    int? pageSize,
  });
}

/// @nodoc
class __$$CisternsFilterImplCopyWithImpl<$Res>
    extends _$CisternsFilterCopyWithImpl<$Res, _$CisternsFilterImpl>
    implements _$$CisternsFilterImplCopyWith<$Res> {
  __$$CisternsFilterImplCopyWithImpl(
    _$CisternsFilterImpl _value,
    $Res Function(_$CisternsFilterImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of CisternsFilter
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? search = freezed,
    Object? manufacturerId = freezed,
    Object? typeId = freezed,
    Object? ownerId = freezed,
    Object? affiliationId = freezed,
    Object? page = freezed,
    Object? pageSize = freezed,
  }) {
    return _then(
      _$CisternsFilterImpl(
        search: freezed == search
            ? _value.search
            : search // ignore: cast_nullable_to_non_nullable
                  as String?,
        manufacturerId: freezed == manufacturerId
            ? _value.manufacturerId
            : manufacturerId // ignore: cast_nullable_to_non_nullable
                  as String?,
        typeId: freezed == typeId
            ? _value.typeId
            : typeId // ignore: cast_nullable_to_non_nullable
                  as String?,
        ownerId: freezed == ownerId
            ? _value.ownerId
            : ownerId // ignore: cast_nullable_to_non_nullable
                  as String?,
        affiliationId: freezed == affiliationId
            ? _value.affiliationId
            : affiliationId // ignore: cast_nullable_to_non_nullable
                  as String?,
        page: freezed == page
            ? _value.page
            : page // ignore: cast_nullable_to_non_nullable
                  as int?,
        pageSize: freezed == pageSize
            ? _value.pageSize
            : pageSize // ignore: cast_nullable_to_non_nullable
                  as int?,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$CisternsFilterImpl implements _CisternsFilter {
  const _$CisternsFilterImpl({
    this.search,
    this.manufacturerId,
    this.typeId,
    this.ownerId,
    this.affiliationId,
    this.page,
    this.pageSize,
  });

  factory _$CisternsFilterImpl.fromJson(Map<String, dynamic> json) =>
      _$$CisternsFilterImplFromJson(json);

  @override
  final String? search;
  @override
  final String? manufacturerId;
  @override
  final String? typeId;
  @override
  final String? ownerId;
  @override
  final String? affiliationId;
  @override
  final int? page;
  @override
  final int? pageSize;

  @override
  String toString() {
    return 'CisternsFilter(search: $search, manufacturerId: $manufacturerId, typeId: $typeId, ownerId: $ownerId, affiliationId: $affiliationId, page: $page, pageSize: $pageSize)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CisternsFilterImpl &&
            (identical(other.search, search) || other.search == search) &&
            (identical(other.manufacturerId, manufacturerId) ||
                other.manufacturerId == manufacturerId) &&
            (identical(other.typeId, typeId) || other.typeId == typeId) &&
            (identical(other.ownerId, ownerId) || other.ownerId == ownerId) &&
            (identical(other.affiliationId, affiliationId) ||
                other.affiliationId == affiliationId) &&
            (identical(other.page, page) || other.page == page) &&
            (identical(other.pageSize, pageSize) ||
                other.pageSize == pageSize));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    search,
    manufacturerId,
    typeId,
    ownerId,
    affiliationId,
    page,
    pageSize,
  );

  /// Create a copy of CisternsFilter
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CisternsFilterImplCopyWith<_$CisternsFilterImpl> get copyWith =>
      __$$CisternsFilterImplCopyWithImpl<_$CisternsFilterImpl>(
        this,
        _$identity,
      );

  @override
  Map<String, dynamic> toJson() {
    return _$$CisternsFilterImplToJson(this);
  }
}

abstract class _CisternsFilter implements CisternsFilter {
  const factory _CisternsFilter({
    final String? search,
    final String? manufacturerId,
    final String? typeId,
    final String? ownerId,
    final String? affiliationId,
    final int? page,
    final int? pageSize,
  }) = _$CisternsFilterImpl;

  factory _CisternsFilter.fromJson(Map<String, dynamic> json) =
      _$CisternsFilterImpl.fromJson;

  @override
  String? get search;
  @override
  String? get manufacturerId;
  @override
  String? get typeId;
  @override
  String? get ownerId;
  @override
  String? get affiliationId;
  @override
  int? get page;
  @override
  int? get pageSize;

  /// Create a copy of CisternsFilter
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CisternsFilterImplCopyWith<_$CisternsFilterImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

PaginatedCisternsResponse _$PaginatedCisternsResponseFromJson(
  Map<String, dynamic> json,
) {
  return _PaginatedCisternsResponse.fromJson(json);
}

/// @nodoc
mixin _$PaginatedCisternsResponse {
  List<RailwayCisternDetailDTO> get railwayCisterns =>
      throw _privateConstructorUsedError;
  int get totalCount => throw _privateConstructorUsedError;
  int get currentPage => throw _privateConstructorUsedError;
  int get pageSize => throw _privateConstructorUsedError;
  int get totalPages => throw _privateConstructorUsedError;

  /// Serializes this PaginatedCisternsResponse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of PaginatedCisternsResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $PaginatedCisternsResponseCopyWith<PaginatedCisternsResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PaginatedCisternsResponseCopyWith<$Res> {
  factory $PaginatedCisternsResponseCopyWith(
    PaginatedCisternsResponse value,
    $Res Function(PaginatedCisternsResponse) then,
  ) = _$PaginatedCisternsResponseCopyWithImpl<$Res, PaginatedCisternsResponse>;
  @useResult
  $Res call({
    List<RailwayCisternDetailDTO> railwayCisterns,
    int totalCount,
    int currentPage,
    int pageSize,
    int totalPages,
  });
}

/// @nodoc
class _$PaginatedCisternsResponseCopyWithImpl<
  $Res,
  $Val extends PaginatedCisternsResponse
>
    implements $PaginatedCisternsResponseCopyWith<$Res> {
  _$PaginatedCisternsResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of PaginatedCisternsResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? railwayCisterns = null,
    Object? totalCount = null,
    Object? currentPage = null,
    Object? pageSize = null,
    Object? totalPages = null,
  }) {
    return _then(
      _value.copyWith(
            railwayCisterns: null == railwayCisterns
                ? _value.railwayCisterns
                : railwayCisterns // ignore: cast_nullable_to_non_nullable
                      as List<RailwayCisternDetailDTO>,
            totalCount: null == totalCount
                ? _value.totalCount
                : totalCount // ignore: cast_nullable_to_non_nullable
                      as int,
            currentPage: null == currentPage
                ? _value.currentPage
                : currentPage // ignore: cast_nullable_to_non_nullable
                      as int,
            pageSize: null == pageSize
                ? _value.pageSize
                : pageSize // ignore: cast_nullable_to_non_nullable
                      as int,
            totalPages: null == totalPages
                ? _value.totalPages
                : totalPages // ignore: cast_nullable_to_non_nullable
                      as int,
          )
          as $Val,
    );
  }
}

/// @nodoc
abstract class _$$PaginatedCisternsResponseImplCopyWith<$Res>
    implements $PaginatedCisternsResponseCopyWith<$Res> {
  factory _$$PaginatedCisternsResponseImplCopyWith(
    _$PaginatedCisternsResponseImpl value,
    $Res Function(_$PaginatedCisternsResponseImpl) then,
  ) = __$$PaginatedCisternsResponseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({
    List<RailwayCisternDetailDTO> railwayCisterns,
    int totalCount,
    int currentPage,
    int pageSize,
    int totalPages,
  });
}

/// @nodoc
class __$$PaginatedCisternsResponseImplCopyWithImpl<$Res>
    extends
        _$PaginatedCisternsResponseCopyWithImpl<
          $Res,
          _$PaginatedCisternsResponseImpl
        >
    implements _$$PaginatedCisternsResponseImplCopyWith<$Res> {
  __$$PaginatedCisternsResponseImplCopyWithImpl(
    _$PaginatedCisternsResponseImpl _value,
    $Res Function(_$PaginatedCisternsResponseImpl) _then,
  ) : super(_value, _then);

  /// Create a copy of PaginatedCisternsResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? railwayCisterns = null,
    Object? totalCount = null,
    Object? currentPage = null,
    Object? pageSize = null,
    Object? totalPages = null,
  }) {
    return _then(
      _$PaginatedCisternsResponseImpl(
        railwayCisterns: null == railwayCisterns
            ? _value._railwayCisterns
            : railwayCisterns // ignore: cast_nullable_to_non_nullable
                  as List<RailwayCisternDetailDTO>,
        totalCount: null == totalCount
            ? _value.totalCount
            : totalCount // ignore: cast_nullable_to_non_nullable
                  as int,
        currentPage: null == currentPage
            ? _value.currentPage
            : currentPage // ignore: cast_nullable_to_non_nullable
                  as int,
        pageSize: null == pageSize
            ? _value.pageSize
            : pageSize // ignore: cast_nullable_to_non_nullable
                  as int,
        totalPages: null == totalPages
            ? _value.totalPages
            : totalPages // ignore: cast_nullable_to_non_nullable
                  as int,
      ),
    );
  }
}

/// @nodoc
@JsonSerializable()
class _$PaginatedCisternsResponseImpl implements _PaginatedCisternsResponse {
  const _$PaginatedCisternsResponseImpl({
    required final List<RailwayCisternDetailDTO> railwayCisterns,
    required this.totalCount,
    required this.currentPage,
    required this.pageSize,
    required this.totalPages,
  }) : _railwayCisterns = railwayCisterns;

  factory _$PaginatedCisternsResponseImpl.fromJson(Map<String, dynamic> json) =>
      _$$PaginatedCisternsResponseImplFromJson(json);

  final List<RailwayCisternDetailDTO> _railwayCisterns;
  @override
  List<RailwayCisternDetailDTO> get railwayCisterns {
    if (_railwayCisterns is EqualUnmodifiableListView) return _railwayCisterns;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_railwayCisterns);
  }

  @override
  final int totalCount;
  @override
  final int currentPage;
  @override
  final int pageSize;
  @override
  final int totalPages;

  @override
  String toString() {
    return 'PaginatedCisternsResponse(railwayCisterns: $railwayCisterns, totalCount: $totalCount, currentPage: $currentPage, pageSize: $pageSize, totalPages: $totalPages)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PaginatedCisternsResponseImpl &&
            const DeepCollectionEquality().equals(
              other._railwayCisterns,
              _railwayCisterns,
            ) &&
            (identical(other.totalCount, totalCount) ||
                other.totalCount == totalCount) &&
            (identical(other.currentPage, currentPage) ||
                other.currentPage == currentPage) &&
            (identical(other.pageSize, pageSize) ||
                other.pageSize == pageSize) &&
            (identical(other.totalPages, totalPages) ||
                other.totalPages == totalPages));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
    runtimeType,
    const DeepCollectionEquality().hash(_railwayCisterns),
    totalCount,
    currentPage,
    pageSize,
    totalPages,
  );

  /// Create a copy of PaginatedCisternsResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$PaginatedCisternsResponseImplCopyWith<_$PaginatedCisternsResponseImpl>
  get copyWith =>
      __$$PaginatedCisternsResponseImplCopyWithImpl<
        _$PaginatedCisternsResponseImpl
      >(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PaginatedCisternsResponseImplToJson(this);
  }
}

abstract class _PaginatedCisternsResponse implements PaginatedCisternsResponse {
  const factory _PaginatedCisternsResponse({
    required final List<RailwayCisternDetailDTO> railwayCisterns,
    required final int totalCount,
    required final int currentPage,
    required final int pageSize,
    required final int totalPages,
  }) = _$PaginatedCisternsResponseImpl;

  factory _PaginatedCisternsResponse.fromJson(Map<String, dynamic> json) =
      _$PaginatedCisternsResponseImpl.fromJson;

  @override
  List<RailwayCisternDetailDTO> get railwayCisterns;
  @override
  int get totalCount;
  @override
  int get currentPage;
  @override
  int get pageSize;
  @override
  int get totalPages;

  /// Create a copy of PaginatedCisternsResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$PaginatedCisternsResponseImplCopyWith<_$PaginatedCisternsResponseImpl>
  get copyWith => throw _privateConstructorUsedError;
}
