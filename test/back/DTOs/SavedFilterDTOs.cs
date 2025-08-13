using System.ComponentModel.DataAnnotations;

namespace back.DTOs;

/// <summary>
/// DTO для сохраненного фильтра
/// </summary>
public class SavedFilterDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string EntityType { get; set; } = null!;
    public string FilterJson { get; set; } = null!;
    public string SortFieldsJson { get; set; } = null!;
    public string SelectedColumnsJson { get; set; } = null!;
    public bool IsDefault { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

/// <summary>
/// DTO для создания сохраненного фильтра
/// </summary>
public class CreateSavedFilterDto
{
    [Required(ErrorMessage = "Название фильтра обязательно")]
    [StringLength(100, ErrorMessage = "Название не должно превышать 100 символов")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Тип сущности обязателен")]
    public string EntityType { get; set; } = null!;

    [Required(ErrorMessage = "JSON фильтров обязателен")]
    public string FilterJson { get; set; } = null!;

    [Required(ErrorMessage = "JSON сортировки обязателен")]
    public string SortFieldsJson { get; set; } = null!;

    [Required(ErrorMessage = "JSON выбранных столбцов обязателен")]
    public string SelectedColumnsJson { get; set; } = null!;

    public bool IsDefault { get; set; } = false;
}

/// <summary>
/// DTO для обновления сохраненного фильтра
/// </summary>
public class UpdateSavedFilterDto
{
    [StringLength(100, ErrorMessage = "Название не должно превышать 100 символов")]
    public string? Name { get; set; }

    public string? FilterJson { get; set; }

    public string? SortFieldsJson { get; set; }

    public string? SelectedColumnsJson { get; set; }

    public bool? IsDefault { get; set; }
}

/// <summary>
/// DTO для конфигурации фильтра
/// </summary>
public class FilterConfigDto
{
    public Dictionary<string, object>? Filters { get; set; }
    public List<SortFieldDto>? SortFields { get; set; }
    public List<string>? SelectedColumns { get; set; }
}

/// <summary>
/// DTO для поля сортировки
/// </summary>
public class SortFieldDto
{
    public string Field { get; set; } = null!;
    public bool Ascending { get; set; } = true;
}

/// <summary>
/// DTO для быстрого применения фильтра
/// </summary>
public class ApplyFilterDto
{
    [Required(ErrorMessage = "ID фильтра обязателен")]
    public Guid FilterId { get; set; }
}
