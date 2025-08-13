using System;
using System.Collections.Generic;

namespace back.Models;

public partial class SavedFilter
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string EntityType { get; set; } = null!; // Тип справочника (Affiliations, Depots, etc.)

    public string FilterJson { get; set; } = null!; // JSON фильтров

    public string SortFieldsJson { get; set; } = null!; // JSON сортировки

    public string SelectedColumnsJson { get; set; } = null!; // JSON выбранных столбцов

    public bool IsDefault { get; set; } = false; // Является ли фильтр по умолчанию для данного справочника

    public Guid UserId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
