import '../models/cistern_models.dart';
import '../utils/api_config.dart';
import 'api_service.dart';

class CisternsService {
  final ApiService _apiService;

  CisternsService(this._apiService);

  // Get paginated list of cisterns
  Future<PaginatedCisternsResponse> getAll({CisternsFilter? filter}) async {
    final Map<String, dynamic> queryParams = {};

    if (filter != null) {
      if (filter.manufacturerId != null) {
        queryParams['manufacturerId'] = filter.manufacturerId;
      }
      if (filter.typeId != null) {
        queryParams['typeId'] = filter.typeId;
      }
      if (filter.ownerId != null) {
        queryParams['ownerId'] = filter.ownerId;
      }
      if (filter.affiliationId != null) {
        queryParams['affiliationId'] = filter.affiliationId;
      }
      if (filter.page != null) {
        queryParams['page'] = filter.page.toString();
      }
      if (filter.pageSize != null) {
        queryParams['pageSize'] = filter.pageSize.toString();
      }
    }

    final response = await _apiService.get(
      ApiEndpoints.cisternsDetailedPaged,
      queryParameters: queryParams,
    );

    if (response.statusCode == ApiConfig.successCode) {
      return PaginatedCisternsResponse.fromJson(response.data);
    } else {
      throw Exception('Failed to get cisterns: ${response.statusMessage}');
    }
  }

  // Get cistern by ID
  Future<RailwayCisternDetailDTO> getById(String id) async {
    final response = await _apiService.get(ApiEndpoints.getCisternById(id));

    if (response.statusCode == ApiConfig.successCode) {
      return RailwayCisternDetailDTO.fromJson(response.data);
    } else {
      throw Exception('Failed to get cistern: ${response.statusMessage}');
    }
  }

  // Create new cistern
  Future<String> create(CreateRailwayCisternDTO data) async {
    final response = await _apiService.post(
      ApiEndpoints.cisterns,
      data: data.toJson(),
    );

    if (response.statusCode == ApiConfig.createdCode) {
      return response.data; // Returns the ID
    } else {
      throw Exception('Failed to create cistern: ${response.statusMessage}');
    }
  }

  // Update cistern
  Future<void> update(String id, UpdateRailwayCisternDTO data) async {
    final response = await _apiService.put(
      ApiEndpoints.getCisternById(id),
      data: data.toJson(),
    );

    if (response.statusCode != ApiConfig.noContentCode) {
      throw Exception('Failed to update cistern: ${response.statusMessage}');
    }
  }

  // Delete cistern
  Future<void> delete(String id) async {
    final response = await _apiService.delete(ApiEndpoints.getCisternById(id));

    if (response.statusCode != ApiConfig.noContentCode) {
      throw Exception('Failed to delete cistern: ${response.statusMessage}');
    }
  }

  // Search cisterns by number prefix
  Future<List<RailwayCisternDetailDTO>> search(String prefix) async {
    if (prefix.trim().isEmpty) {
      return [];
    }

    final response = await _apiService.get(
      ApiEndpoints.cisternsDetailedSearch,
      queryParameters: {'prefix': prefix},
    );

    if (response.statusCode == ApiConfig.successCode) {
      final List<dynamic> data = response.data;
      return data
          .map((json) => RailwayCisternDetailDTO.fromJson(json))
          .toList();
    } else {
      throw Exception('Failed to search cisterns: ${response.statusMessage}');
    }
  }

  // Get all cistern numbers
  Future<List<String>> getAllNumbers() async {
    final response = await _apiService.get(ApiEndpoints.cisternsNumbers);

    if (response.statusCode == ApiConfig.successCode) {
      final List<dynamic> data = response.data;
      return data.cast<String>();
    } else {
      throw Exception(
        'Failed to get cistern numbers: ${response.statusMessage}',
      );
    }
  }

  // Search cistern numbers by prefix
  Future<List<String>> searchNumbers(String prefix) async {
    final response = await _apiService.get(
      ApiEndpoints.cisternsNumbersSearch,
      queryParameters: {'prefix': prefix},
    );

    if (response.statusCode == ApiConfig.successCode) {
      final List<dynamic> data = response.data;
      return data.cast<String>();
    } else {
      throw Exception(
        'Failed to search cistern numbers: ${response.statusMessage}',
      );
    }
  }
}
