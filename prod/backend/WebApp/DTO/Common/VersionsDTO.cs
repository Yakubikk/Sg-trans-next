namespace WebApp.DTO.Common;

using System.Text.Json.Serialization;

public class VersionsDTO
{
    [JsonPropertyName("backend")]
    public string Backend { get; set; } = string.Empty;

    [JsonPropertyName("frontend")]
    public string Frontend { get; set; } = string.Empty;
}
