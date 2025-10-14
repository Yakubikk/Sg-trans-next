using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.RailwayCisterns;

public class Station
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public int Code { get; set; }
    [Column("Osm_id")]
    public string? OsmId { get; set; }
    [Column("Uicref")]
    public int? UicRef { get; set; }
    public double Lat { get; set; }
    public double Lon { get; set; }
    public string? Iso3166 { get; set; }
    public string? Type { get; set; }
    public string? Operator { get; set; }
    public string? Country { get; set; }
    public string? Region { get; set; }
    public string? Division { get; set; }
    public string? Railway { get; set; }
}
