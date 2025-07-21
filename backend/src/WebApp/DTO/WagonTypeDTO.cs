using WebApp.DTO.Common;

namespace WebApp.DTO;

// WagonType DTOs
public class WagonTypeRequest
{
    public string Name { get; set; } = string.Empty;
}

public class WagonTypeResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class WagonTypeDetailResponse : WagonTypeResponse
{
    public ICollection<RailwayCisternSummaryResponse>? RailwayCisterns { get; set; }
}

// WagonModel DTOs should be moved to a separate file
