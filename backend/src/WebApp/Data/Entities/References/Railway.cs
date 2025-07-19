using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("спрдороги")]
public class Railway
{
    [Key]
    public Guid Id { get; set; }

    [Column("коддороги")] public double RailwayCode { get; set; } // Код дороги

    [Column("наименование")]
    [StringLength(255)]
    public string? Name { get; set; } // Наименование

    [Column("сокр")] [StringLength(255)] public string? Abbreviation { get; set; } // Сокращение
}