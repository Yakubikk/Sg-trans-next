using System.ComponentModel.DataAnnotations;

namespace back.DTOs;

public abstract class BaseEntityDto
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? CreatorId { get; set; }
}

public abstract class BaseCreateDto
{
    // Базовые поля для создания
}

public abstract class BaseUpdateDto
{
    // Базовые поля для обновления
}

// Affiliation DTOs
public class AffiliationDto : BaseEntityDto
{
    public string Value { get; set; } = null!;
}

public class CreateAffiliationDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Value { get; set; } = null!;
}

public class UpdateAffiliationDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Value { get; set; }
}

// Depot DTOs
public class DepotDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string Code { get; set; } = null!;
    public string? Location { get; set; }
}

public class CreateDepotDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [Required]
    [StringLength(50)]
    public string Code { get; set; } = null!;
    
    [StringLength(255)]
    public string? Location { get; set; }
}

public class UpdateDepotDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(50)]
    public string? Code { get; set; }
    
    [StringLength(255)]
    public string? Location { get; set; }
}

// Location DTOs
public class LocationDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string? Address { get; set; }
    public string? Region { get; set; }
    public string? Country { get; set; }
}

public class CreateLocationDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [StringLength(500)]
    public string? Address { get; set; }
    
    [StringLength(255)]
    public string? Region { get; set; }
    
    [StringLength(255)]
    public string? Country { get; set; }
}

public class UpdateLocationDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(500)]
    public string? Address { get; set; }
    
    [StringLength(255)]
    public string? Region { get; set; }
    
    [StringLength(255)]
    public string? Country { get; set; }
}

// Manufacturer DTOs
public class ManufacturerDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string Country { get; set; } = null!;
    public string? ShortName { get; set; }
    public int Code { get; set; }
}

public class CreateManufacturerDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [Required]
    [StringLength(255)]
    public string Country { get; set; } = null!;
    
    [StringLength(50)]
    public string? ShortName { get; set; }
    
    [Required]
    public int Code { get; set; }
}

public class UpdateManufacturerDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(255)]
    public string? Country { get; set; }
    
    [StringLength(50)]
    public string? ShortName { get; set; }
    
    public int? Code { get; set; }
}

// Owner DTOs
public class OwnerDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string? Unp { get; set; }
    public string ShortName { get; set; } = null!;
    public string? Address { get; set; }
    public bool TreatRepairs { get; set; }
    public int? Code { get; set; }
}

public class CreateOwnerDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [StringLength(50)]
    public string? Unp { get; set; }
    
    [Required]
    [StringLength(100)]
    public string ShortName { get; set; } = null!;
    
    [StringLength(500)]
    public string? Address { get; set; }
    
    public bool TreatRepairs { get; set; }
    
    public int? Code { get; set; }
}

public class UpdateOwnerDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(50)]
    public string? Unp { get; set; }
    
    [StringLength(100)]
    public string? ShortName { get; set; }
    
    [StringLength(500)]
    public string? Address { get; set; }
    
    public bool? TreatRepairs { get; set; }
    
    public int? Code { get; set; }
}

// PartStatus DTOs
public class PartStatusDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public int Code { get; set; }
}

public class CreatePartStatusDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [StringLength(500)]
    public string? Description { get; set; }
    
    public bool IsActive { get; set; } = true;
}

public class UpdatePartStatusDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(500)]
    public string? Description { get; set; }
    
    public bool? IsActive { get; set; }
}

// PartType DTOs
public class PartTypeDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int Code { get; set; }
}

public class CreatePartTypeDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [StringLength(500)]
    public string? Description { get; set; }
}

public class UpdatePartTypeDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(500)]
    public string? Description { get; set; }
}

// Registrar DTOs
public class RegistrarDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string? ShortName { get; set; }
    public string? Address { get; set; }
    public int? Code { get; set; }
}

public class CreateRegistrarDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [StringLength(50)]
    public string? ShortName { get; set; }
    
    [StringLength(500)]
    public string? Address { get; set; }
    
    public int? Code { get; set; }
}

public class UpdateRegistrarDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(50)]
    public string? ShortName { get; set; }
    
    [StringLength(500)]
    public string? Address { get; set; }
    
    public int? Code { get; set; }
}

// RepairType DTOs
public class RepairTypeDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int? DurationDays { get; set; }
    public string Code { get; set; } = null!;
}

public class CreateRepairTypeDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [StringLength(500)]
    public string? Description { get; set; }
    
    [Range(1, 365)]
    public int? DurationDays { get; set; }
}

public class UpdateRepairTypeDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(500)]
    public string? Description { get; set; }
    
    [Range(1, 365)]
    public int? DurationDays { get; set; }
}

// WagonModel DTOs
public class WagonModelDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string? Code { get; set; }
    public Guid? WagonTypeId { get; set; }
    public WagonTypeDto? WagonType { get; set; }
}

public class CreateWagonModelDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [StringLength(50)]
    public string? Code { get; set; }
    
    public Guid? WagonTypeId { get; set; }
}

public class UpdateWagonModelDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(50)]
    public string? Code { get; set; }
    
    public Guid? WagonTypeId { get; set; }
}

// WagonType DTOs
public class WagonTypeDto : BaseEntityDto
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string? Code { get; set; }
}

public class CreateWagonTypeDto : BaseCreateDto
{
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = null!;
    
    [StringLength(500)]
    public string? Description { get; set; }
    
    [StringLength(50)]
    public string? Code { get; set; }
}

public class UpdateWagonTypeDto : BaseUpdateDto
{
    [StringLength(255)]
    public string? Name { get; set; }
    
    [StringLength(500)]
    public string? Description { get; set; }
    
    [StringLength(50)]
    public string? Code { get; set; }
}

// Пагинация
public class PaginatedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int Size { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / Size);
    public bool HasNextPage => Page < TotalPages;
    public bool HasPreviousPage => Page > 1;
}
