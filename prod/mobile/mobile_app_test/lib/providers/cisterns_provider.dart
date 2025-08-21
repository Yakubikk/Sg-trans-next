import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/cistern_models.dart';
import '../services/cisterns_service.dart';
import 'auth_provider.dart';

// Cisterns Service Provider
final cisternsServiceProvider = Provider<CisternsService>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return CisternsService(apiService);
});

// Cisterns Filter State Provider
final cisternsFilterProvider = StateProvider<CisternsFilter>((ref) {
  return const CisternsFilter(page: 1, pageSize: 20);
});

// Cisterns List Provider
final cisternsListProvider = FutureProvider<PaginatedCisternsResponse>((
  ref,
) async {
  final cisternsService = ref.watch(cisternsServiceProvider);
  final filter = ref.watch(cisternsFilterProvider);
  return cisternsService.getAll(filter: filter);
});

// Cistern Detail Provider
final cisternDetailProvider =
    FutureProvider.family<RailwayCisternDetailDTO, String>((ref, id) async {
      final cisternsService = ref.watch(cisternsServiceProvider);
      return cisternsService.getById(id);
    });

// Cisterns Search Provider
final cisternsSearchProvider =
    FutureProvider.family<List<RailwayCisternDetailDTO>, String>((
      ref,
      prefix,
    ) async {
      final cisternsService = ref.watch(cisternsServiceProvider);
      if (prefix.trim().isEmpty) return [];
      return cisternsService.search(prefix);
    });

// Cistern Numbers Provider
final cisternNumbersProvider = FutureProvider<List<String>>((ref) async {
  final cisternsService = ref.watch(cisternsServiceProvider);
  return cisternsService.getAllNumbers();
});

// Cistern Numbers Search Provider
final cisternNumbersSearchProvider =
    FutureProvider.family<List<String>, String>((ref, prefix) async {
      final cisternsService = ref.watch(cisternsServiceProvider);
      if (prefix.trim().isEmpty) return [];
      return cisternsService.searchNumbers(prefix);
    });

// Cisterns Operations Notifier
class CisternsNotifier extends StateNotifier<AsyncValue<void>> {
  final CisternsService _cisternsService;
  final Ref _ref;

  CisternsNotifier(this._cisternsService, this._ref)
    : super(const AsyncValue.data(null));

  Future<void> createCistern(CreateRailwayCisternDTO data) async {
    state = const AsyncValue.loading();
    try {
      await _cisternsService.create(data);
      state = const AsyncValue.data(null);
      // Invalidate the cisterns list to refresh it
      _ref.invalidate(cisternsListProvider);
    } catch (e, stackTrace) {
      state = AsyncValue.error(e, stackTrace);
    }
  }

  Future<void> updateCistern(String id, UpdateRailwayCisternDTO data) async {
    state = const AsyncValue.loading();
    try {
      await _cisternsService.update(id, data);
      state = const AsyncValue.data(null);
      // Invalidate both the list and the specific cistern detail
      _ref.invalidate(cisternsListProvider);
      _ref.invalidate(cisternDetailProvider(id));
    } catch (e, stackTrace) {
      state = AsyncValue.error(e, stackTrace);
    }
  }

  Future<void> deleteCistern(String id) async {
    state = const AsyncValue.loading();
    try {
      await _cisternsService.delete(id);
      state = const AsyncValue.data(null);
      // Invalidate the cisterns list to refresh it
      _ref.invalidate(cisternsListProvider);
    } catch (e, stackTrace) {
      state = AsyncValue.error(e, stackTrace);
    }
  }

  void refreshCisterns() {
    _ref.invalidate(cisternsListProvider);
  }

  void updateFilter(CisternsFilter filter) {
    _ref.read(cisternsFilterProvider.notifier).state = filter;
  }
}

// Cisterns Operations Provider
final cisternsNotifierProvider =
    StateNotifierProvider<CisternsNotifier, AsyncValue<void>>((ref) {
      final cisternsService = ref.watch(cisternsServiceProvider);
      return CisternsNotifier(cisternsService, ref);
    });
