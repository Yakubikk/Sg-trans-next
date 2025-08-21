import 'package:freezed_annotation/freezed_annotation.dart';

part 'cistern_models.freezed.dart';
part 'cistern_models.g.dart';

// Railway Cistern Detail DTO
@freezed
class RailwayCisternDetailDTO with _$RailwayCisternDetailDTO {
  const factory RailwayCisternDetailDTO({
    required String id,
    required String number,
    required Manufacturer manufacturer,
    required String buildDate,
    required double tareWeight,
    required double loadCapacity,
    required double length,
    required int axleCount,
    required double volume,
    double? fillingVolume,
    double? initialTareWeight,
    required WagonType type,
    WagonModel? model,
    String? commissioningDate,
    required String serialNumber,
    required String registrationNumber,
    required String registrationDate,
    Registrar? registrar,
    required String notes,
    Owner? owner,
    String? techConditions,
    String? pripiska,
    String? reRegistrationDate,
    required double pressure,
    required double testPressure,
    String? rent,
    required Affiliation affiliation,
    required int serviceLifeYears,
    String? periodMajorRepair,
    String? periodPeriodicTest,
    String? periodIntermediateTest,
    String? periodDepotRepair,
    required int dangerClass,
    required String substance,
    required double tareWeight2,
    required double tareWeight3,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) = _RailwayCisternDetailDTO;

  factory RailwayCisternDetailDTO.fromJson(Map<String, dynamic> json) =>
      _$RailwayCisternDetailDTOFromJson(json);
}

// Manufacturer
@freezed
class Manufacturer with _$Manufacturer {
  const factory Manufacturer({
    required String id,
    required String name,
    String? country,
    String? shortName,
    String? code,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _Manufacturer;

  factory Manufacturer.fromJson(Map<String, dynamic> json) =>
      _$ManufacturerFromJson(json);
}

// Wagon Type
@freezed
class WagonType with _$WagonType {
  const factory WagonType({
    required String id,
    required String name,
    String? type,
  }) = _WagonType;

  factory WagonType.fromJson(Map<String, dynamic> json) =>
      _$WagonTypeFromJson(json);
}

// Wagon Model
@freezed
class WagonModel with _$WagonModel {
  const factory WagonModel({required String id, required String name}) =
      _WagonModel;

  factory WagonModel.fromJson(Map<String, dynamic> json) =>
      _$WagonModelFromJson(json);
}

// Registrar
@freezed
class Registrar with _$Registrar {
  const factory Registrar({required String id, required String name}) =
      _Registrar;

  factory Registrar.fromJson(Map<String, dynamic> json) =>
      _$RegistrarFromJson(json);
}

// Owner
@freezed
class Owner with _$Owner {
  const factory Owner({
    required String id,
    required String name,
    String? unp,
    String? shortName,
    String? address,
    bool? treatRepairs,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _Owner;

  factory Owner.fromJson(Map<String, dynamic> json) => _$OwnerFromJson(json);
}

// Affiliation
@freezed
class Affiliation with _$Affiliation {
  const factory Affiliation({required String id, required String value}) =
      _Affiliation;

  factory Affiliation.fromJson(Map<String, dynamic> json) =>
      _$AffiliationFromJson(json);
}

// Railway Cistern List DTO
@freezed
class RailwayCisternListDTO with _$RailwayCisternListDTO {
  const factory RailwayCisternListDTO({
    required String id,
    required String number,
    required String manufacturerName,
    required String buildDate,
    required String typeName,
    required String modelName,
    required String ownerName,
    required String registrationNumber,
    required String registrationDate,
    required String affiliationValue,
  }) = _RailwayCisternListDTO;

  factory RailwayCisternListDTO.fromJson(Map<String, dynamic> json) =>
      _$RailwayCisternListDTOFromJson(json);
}

// Create Railway Cistern DTO
@freezed
class CreateRailwayCisternDTO with _$CreateRailwayCisternDTO {
  const factory CreateRailwayCisternDTO({
    required String number,
    required String manufacturerId,
    required String buildDate,
    required double tareWeight,
    required double loadCapacity,
    required double length,
    required int axleCount,
    required double volume,
    double? fillingVolume,
    double? initialTareWeight,
    required String typeId,
    String? modelId,
    String? commissioningDate,
    required String serialNumber,
    required String registrationNumber,
    required String registrationDate,
    String? registrarId,
    required String notes,
    String? ownerId,
    String? techConditions,
    String? pripiska,
    String? reRegistrationDate,
    required double pressure,
    required double testPressure,
    String? rent,
    required String affiliationId,
    required int serviceLifeYears,
    String? periodMajorRepair,
    String? periodPeriodicTest,
    String? periodIntermediateTest,
    String? periodDepotRepair,
    required int dangerClass,
    required String substance,
    required double tareWeight2,
    required double tareWeight3,
  }) = _CreateRailwayCisternDTO;

  factory CreateRailwayCisternDTO.fromJson(Map<String, dynamic> json) =>
      _$CreateRailwayCisternDTOFromJson(json);
}

// Update Railway Cistern DTO
@freezed
class UpdateRailwayCisternDTO with _$UpdateRailwayCisternDTO {
  const factory UpdateRailwayCisternDTO({
    required String id,
    required String number,
    required String manufacturerId,
    required String buildDate,
    required double tareWeight,
    required double loadCapacity,
    required double length,
    required int axleCount,
    required double volume,
    double? fillingVolume,
    double? initialTareWeight,
    required String typeId,
    String? modelId,
    String? commissioningDate,
    required String serialNumber,
    required String registrationNumber,
    required String registrationDate,
    String? registrarId,
    required String notes,
    String? ownerId,
    String? techConditions,
    String? pripiska,
    String? reRegistrationDate,
    required double pressure,
    required double testPressure,
    String? rent,
    required String affiliationId,
    required int serviceLifeYears,
    String? periodMajorRepair,
    String? periodPeriodicTest,
    String? periodIntermediateTest,
    String? periodDepotRepair,
    required int dangerClass,
    required String substance,
    required double tareWeight2,
    required double tareWeight3,
  }) = _UpdateRailwayCisternDTO;

  factory UpdateRailwayCisternDTO.fromJson(Map<String, dynamic> json) =>
      _$UpdateRailwayCisternDTOFromJson(json);
}

// Pagination and filtering
@freezed
class CisternsFilter with _$CisternsFilter {
  const factory CisternsFilter({
    String? search,
    String? manufacturerId,
    String? typeId,
    String? ownerId,
    String? affiliationId,
    int? page,
    int? pageSize,
  }) = _CisternsFilter;

  factory CisternsFilter.fromJson(Map<String, dynamic> json) =>
      _$CisternsFilterFromJson(json);
}

@freezed
class PaginatedCisternsResponse with _$PaginatedCisternsResponse {
  const factory PaginatedCisternsResponse({
    required List<RailwayCisternDetailDTO> railwayCisterns,
    required int totalCount,
    required int currentPage,
    required int pageSize,
    required int totalPages,
  }) = _PaginatedCisternsResponse;

  factory PaginatedCisternsResponse.fromJson(Map<String, dynamic> json) =>
      _$PaginatedCisternsResponseFromJson(json);
}
