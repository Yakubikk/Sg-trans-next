using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.DTO.Common;

[BindProperties]
public class PaginationParameters
{
    private const int MaxPageSize = 50;
    private int _pageSize = 10;
    
    [DefaultValue(1)]
    public int PageNumber { get; set; } = 1;
    
    [DefaultValue(10)]
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
}

public class PaginatedList<T>
{
    public List<T> Items { get; set; } = new();
    public int PageNumber { get; set; }
    public int TotalPages { get; set; }
    public int TotalCount { get; set; }
    public bool HasPreviousPage => PageNumber > 1;
    public bool HasNextPage => PageNumber < TotalPages;
}
