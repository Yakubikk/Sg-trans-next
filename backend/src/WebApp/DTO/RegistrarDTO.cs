using WebApp.DTO.Common;

namespace WebApp.DTO;

public class RegistrarRequest
{
    public string Name { get; set; } = string.Empty;
}

public class RegistrarResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class RegistrarDetailResponse : RegistrarResponse
{
    public ICollection<RailwayCisternSummaryResponse>? RailwayCisterns { get; set; }
}
