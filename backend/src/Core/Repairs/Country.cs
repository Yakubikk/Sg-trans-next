using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Repairs;

[Table("справочник_страны")]
public class Country
{
    [Key]
    public Guid Id { get; set; }

    [Column("кодстанции")] public int CountryCode { get; set; } // Код страны

    [Column("названиестраны")]
    [StringLength(50)]
    public string? CountryName { get; set; } // Название страны
}