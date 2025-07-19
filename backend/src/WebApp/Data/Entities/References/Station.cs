using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("справочник_станции")]
public class Station
{
    [Key]
    public Guid Id { get; set; }

    [Column("кодстанции")]
    [StringLength(6)]
    public string StationCode { get; set; } = string.Empty; // Код станции

    [Column("названиестанции")]
    [StringLength(30)]
    public string? StationName { get; set; } // Название станции

    [Column("остатоквпутим")]
    [StringLength(3)]
    public string? RemainingOnTrackM { get; set; } // Остаток в пути (М)

    [Column("остатоквпутин")]
    [StringLength(3)]
    public string? RemainingOnTrackN { get; set; } // Остаток в пути (Н)

    [Column("остатоквпутир")]
    [StringLength(3)]
    public string? RemainingOnTrackR { get; set; } // Остаток в пути (Р)

    [Column("остатоквпутив")]
    [StringLength(3)]
    public string? RemainingOnTrackV { get; set; } // Остаток в пути (В)

    [Column("дорога")] [StringLength(50)] public string? Railway { get; set; } // Дорога

    [Column("полноенаименование")]
    [StringLength(50)]
    public string? FullName { get; set; } // Полное наименование

    [Column("дорога наименование")]
    [StringLength(50)]
    public string? RailwayName { get; set; } // Наименование дороги

    [Column("страна дороги код")]
    [StringLength(6)]
    public string? CountryCode { get; set; } // Код страны дороги

    [Column("страна дороги")]
    [StringLength(20)]
    public string? CountryName { get; set; } // Страна дороги

    [Column("действует")] public bool IsActive { get; set; } // Действует
}