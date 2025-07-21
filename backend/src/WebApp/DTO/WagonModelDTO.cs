using WebApp.DTO.Common;

namespace WebApp.DTO;

public class WagonModelRequest
{
    public string Name { get; set; } = string.Empty;
}

public class WagonModelResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class WagonModelDetailResponse : WagonModelResponse
{
    public ICollection<RailwayCisternSummaryResponse>? RailwayCisterns { get; set; }
}
