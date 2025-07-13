using AutoMapper;
using Core.Users;
using Persistence.Entities;

namespace Persistence.Mappings;

public class DataBaseMappings : Profile
{
    public DataBaseMappings()
    {
        CreateMap<UserEntity, User>()
            .ForMember(dest => dest.Roles, 
                opt => opt.MapFrom(src => src.Roles.Select(r => (Role)r.Id)));

        CreateMap<RoleEntity, Role>()
            .ConvertUsing(src => (Role)src.Id);

        CreateMap<PermissionEntity, Permission>()
            .ConvertUsing(src => (Permission)src.Id);
    }
}