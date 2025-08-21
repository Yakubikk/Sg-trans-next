import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/auth_provider.dart';
import '../providers/cisterns_provider.dart';
import '../widgets/cistern_card.dart';
import 'cistern_detail_screen.dart';
import 'login_screen.dart';

class CisternsListScreen extends ConsumerStatefulWidget {
  const CisternsListScreen({super.key});

  @override
  ConsumerState<CisternsListScreen> createState() => _CisternsListScreenState();
}

class _CisternsListScreenState extends ConsumerState<CisternsListScreen> {
  final _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _logout() async {
    await ref.read(authStateProvider.notifier).logout();
    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const LoginScreen()),
      );
    }
  }

  void _refreshCisterns() {
    ref.read(cisternsNotifierProvider.notifier).refreshCisterns();
  }

  void _openCisternDetail(String cisternId) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => CisternDetailScreen(cisternId: cisternId),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentUser = ref.watch(currentUserProvider);
    final cisternsAsync = ref.watch(cisternsListProvider);
    final filter = ref.watch(cisternsFilterProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Железнодорожные цистерны'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _refreshCisterns,
          ),
          PopupMenuButton<String>(
            onSelected: (value) {
              if (value == 'logout') {
                _logout();
              }
            },
            itemBuilder: (context) => [
              PopupMenuItem(
                value: 'logout',
                child: Row(
                  children: [
                    const Icon(Icons.logout),
                    const SizedBox(width: 8),
                    Text('Выйти (${currentUser?.email ?? ''})'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: Column(
        children: [
          // Search bar
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Поиск по номеру цистерны...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _searchController.clear();
                          setState(() {});
                        },
                      )
                    : null,
              ),
              onChanged: (value) {
                setState(() {});
                // Implement search logic here if needed
              },
            ),
          ),

          // Cisterns list
          Expanded(
            child: cisternsAsync.when(
              data: (response) {
                if (response.railwayCisterns.isEmpty) {
                  return const Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.train, size: 64, color: Colors.grey),
                        SizedBox(height: 16),
                        Text(
                          'Цистерны не найдены',
                          style: TextStyle(fontSize: 18, color: Colors.grey),
                        ),
                      ],
                    ),
                  );
                }

                return RefreshIndicator(
                  onRefresh: () async => _refreshCisterns(),
                  child: ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount:
                        response.railwayCisterns.length +
                        1, // +1 for pagination info
                    itemBuilder: (context, index) {
                      if (index == response.railwayCisterns.length) {
                        // Pagination info at the bottom
                        return Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            children: [
                              Text(
                                'Страница ${response.currentPage} из ${response.totalPages}',
                                style: const TextStyle(color: Colors.grey),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Всего цистерн: ${response.totalCount}',
                                style: const TextStyle(color: Colors.grey),
                              ),
                              const SizedBox(height: 16),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  ElevatedButton(
                                    onPressed: response.currentPage > 1
                                        ? () {
                                            final newFilter = filter.copyWith(
                                              page: response.currentPage - 1,
                                            );
                                            ref
                                                    .read(
                                                      cisternsFilterProvider
                                                          .notifier,
                                                    )
                                                    .state =
                                                newFilter;
                                          }
                                        : null,
                                    child: const Text('Предыдущая'),
                                  ),
                                  ElevatedButton(
                                    onPressed:
                                        response.currentPage <
                                            response.totalPages
                                        ? () {
                                            final newFilter = filter.copyWith(
                                              page: response.currentPage + 1,
                                            );
                                            ref
                                                    .read(
                                                      cisternsFilterProvider
                                                          .notifier,
                                                    )
                                                    .state =
                                                newFilter;
                                          }
                                        : null,
                                    child: const Text('Следующая'),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        );
                      }

                      final cistern = response.railwayCisterns[index];
                      return CisternCard(
                        cistern: cistern,
                        onTap: () => _openCisternDetail(cistern.id),
                      );
                    },
                  ),
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stackTrace) => Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.error, size: 64, color: Colors.red),
                    const SizedBox(height: 16),
                    Text(
                      'Ошибка загрузки данных',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.red.shade700,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      error.toString(),
                      style: const TextStyle(color: Colors.grey),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _refreshCisterns,
                      child: const Text('Попробовать снова'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // TODO: Navigate to create cistern screen
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Функция создания цистерны в разработке'),
            ),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
