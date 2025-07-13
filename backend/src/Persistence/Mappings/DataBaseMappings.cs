using AutoMapper;
using Core.Users;
using Persistence.Entities;

namespace Persistence.Mappings;

public class DataBaseMappings : Profile
{
    public DataBaseMappings()
    {
        CreateMap<UserEntity,User>();
    }
}