namespace WebApp.DTO;

public class VesselCreateRequest
{
    public string? VesselSerialNumber { get; set; }
    public DateOnly? VesselBuildDate { get; set; }
}

public class VesselFullResponse
{
    public Guid Id { get; set; }
    public Guid RailwayCisternId { get; set; }
    public string? VesselSerialNumber { get; set; }
    public DateOnly? VesselBuildDate { get; set; }
}

public class VesselDetailFullResponse : VesselFullResponse
{
    public RailwayCisternResponse? RailwayCistern { get; set; }
}
