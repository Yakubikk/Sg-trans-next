import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/cisterns_provider.dart';

class CisternDetailScreen extends ConsumerWidget {
  final String cisternId;

  const CisternDetailScreen({super.key, required this.cisternId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cisternAsync = ref.watch(cisternDetailProvider(cisternId));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Детали цистерны'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              ref.invalidate(cisternDetailProvider(cisternId));
            },
          ),
        ],
      ),
      body: cisternAsync.when(
        data: (cistern) => SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header card
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.train, size: 32, color: Colors.blue),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Цистерна №${cistern.number}',
                                  style: const TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Text(
                                  cistern.type.name,
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Colors.grey.shade600,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 16),

              // Basic Information
              _buildSection(
                title: 'Основная информация',
                icon: Icons.info,
                children: [
                  _buildInfoRow('Производитель', cistern.manufacturer.name),
                  _buildInfoRow('Дата постройки', cistern.buildDate),
                  _buildInfoRow('Серийный номер', cistern.serialNumber),
                  _buildInfoRow('Модель', cistern.model?.name ?? 'Не указана'),
                  if (cistern.commissioningDate != null)
                    _buildInfoRow(
                      'Дата ввода в эксплуатацию',
                      cistern.commissioningDate!,
                    ),
                ],
              ),

              const SizedBox(height: 16),

              // Technical Specifications
              _buildSection(
                title: 'Технические характеристики',
                icon: Icons.engineering,
                children: [
                  _buildInfoRow(
                    'Тара (масса)',
                    '${cistern.tareWeight.toStringAsFixed(1)} т',
                  ),
                  _buildInfoRow(
                    'Грузоподъемность',
                    '${cistern.loadCapacity.toStringAsFixed(1)} т',
                  ),
                  _buildInfoRow(
                    'Длина',
                    '${cistern.length.toStringAsFixed(2)} м',
                  ),
                  _buildInfoRow('Количество осей', '${cistern.axleCount}'),
                  _buildInfoRow(
                    'Объем',
                    '${cistern.volume.toStringAsFixed(1)} м³',
                  ),
                  if (cistern.fillingVolume != null)
                    _buildInfoRow(
                      'Объем заполнения',
                      '${cistern.fillingVolume!.toStringAsFixed(1)} м³',
                    ),
                  if (cistern.initialTareWeight != null)
                    _buildInfoRow(
                      'Первоначальная тара',
                      '${cistern.initialTareWeight!.toStringAsFixed(1)} т',
                    ),
                  _buildInfoRow(
                    'Давление',
                    '${cistern.pressure.toStringAsFixed(2)} МПа',
                  ),
                  _buildInfoRow(
                    'Испытательное давление',
                    '${cistern.testPressure.toStringAsFixed(2)} МПа',
                  ),
                ],
              ),

              const SizedBox(height: 16),

              // Registration Information
              _buildSection(
                title: 'Регистрационная информация',
                icon: Icons.assignment,
                children: [
                  _buildInfoRow(
                    'Регистрационный номер',
                    cistern.registrationNumber,
                  ),
                  _buildInfoRow('Дата регистрации', cistern.registrationDate),
                  if (cistern.registrar != null)
                    _buildInfoRow('Регистратор', cistern.registrar!.name),
                  _buildInfoRow('Принадлежность', cistern.affiliation.value),
                  if (cistern.pripiska != null)
                    _buildInfoRow('Приписка', cistern.pripiska!),
                ],
              ),

              const SizedBox(height: 16),

              // Owner Information
              if (cistern.owner != null)
                _buildSection(
                  title: 'Информация о владельце',
                  icon: Icons.business,
                  children: [
                    _buildInfoRow('Наименование', cistern.owner!.name),
                    if (cistern.owner!.shortName != null)
                      _buildInfoRow(
                        'Сокращенное наименование',
                        cistern.owner!.shortName!,
                      ),
                    if (cistern.owner!.unp != null)
                      _buildInfoRow('УНП', cistern.owner!.unp!),
                    if (cistern.owner!.address != null)
                      _buildInfoRow('Адрес', cistern.owner!.address!),
                  ],
                ),

              const SizedBox(height: 16),

              // Safety Information
              _buildSection(
                title: 'Информация о безопасности',
                icon: Icons.warning,
                children: [
                  _buildInfoRow('Класс опасности', '${cistern.dangerClass}'),
                  _buildInfoRow('Вещество', cistern.substance),
                  _buildInfoRow(
                    'Срок службы (лет)',
                    '${cistern.serviceLifeYears}',
                  ),
                  if (cistern.periodMajorRepair != null)
                    _buildInfoRow(
                      'Период капитального ремонта',
                      cistern.periodMajorRepair!,
                    ),
                  if (cistern.periodPeriodicTest != null)
                    _buildInfoRow(
                      'Период периодических испытаний',
                      cistern.periodPeriodicTest!,
                    ),
                  if (cistern.periodIntermediateTest != null)
                    _buildInfoRow(
                      'Период промежуточных испытаний',
                      cistern.periodIntermediateTest!,
                    ),
                  if (cistern.periodDepotRepair != null)
                    _buildInfoRow(
                      'Период деповского ремонта',
                      cistern.periodDepotRepair!,
                    ),
                ],
              ),

              const SizedBox(height: 16),

              // Additional Information
              if (cistern.notes.isNotEmpty)
                _buildSection(
                  title: 'Дополнительная информация',
                  icon: Icons.note,
                  children: [
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.grey.shade50,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.grey.shade300),
                      ),
                      child: Text(
                        cistern.notes,
                        style: const TextStyle(fontSize: 14),
                      ),
                    ),
                  ],
                ),

              const SizedBox(height: 16),

              // Timestamps
              _buildSection(
                title: 'Системная информация',
                icon: Icons.schedule,
                children: [
                  _buildInfoRow('Создано', _formatDateTime(cistern.createdAt)),
                  _buildInfoRow(
                    'Обновлено',
                    _formatDateTime(cistern.updatedAt),
                  ),
                ],
              ),

              const SizedBox(height: 32),
            ],
          ),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stackTrace) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error, size: 64, color: Colors.red),
              const SizedBox(height: 16),
              Text(
                'Ошибка загрузки данных',
                style: TextStyle(fontSize: 18, color: Colors.red.shade700),
              ),
              const SizedBox(height: 8),
              Text(
                error.toString(),
                style: const TextStyle(color: Colors.grey),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  ref.invalidate(cisternDetailProvider(cisternId));
                },
                child: const Text('Попробовать снова'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSection({
    required String title,
    required IconData icon,
    required List<Widget> children,
  }) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: Colors.blue),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ...children,
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 140,
            child: Text(
              label,
              style: TextStyle(
                fontWeight: FontWeight.w500,
                color: Colors.grey.shade700,
              ),
            ),
          ),
          Expanded(child: Text(value, style: const TextStyle(fontSize: 14))),
        ],
      ),
    );
  }

  String _formatDateTime(DateTime dateTime) {
    return '${dateTime.day.toString().padLeft(2, '0')}.${dateTime.month.toString().padLeft(2, '0')}.${dateTime.year} ${dateTime.hour.toString().padLeft(2, '0')}:${dateTime.minute.toString().padLeft(2, '0')}';
  }
}
