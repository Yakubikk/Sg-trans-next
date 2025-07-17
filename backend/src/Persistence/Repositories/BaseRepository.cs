using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public abstract class BaseRepository<TEntity> where TEntity : class
{
    protected readonly ApplicationDbContext Context;
    protected readonly DbSet<TEntity> DbSet;

    protected BaseRepository(ApplicationDbContext context)
    {
        Context = context;
        DbSet = context.Set<TEntity>();
    }

    public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await DbSet.ToListAsync();
    }

    public virtual async Task<TEntity?> GetByIdAsync(Guid id)
    {
        return await DbSet.FindAsync(id);
    }

    public virtual async Task<TEntity> CreateAsync(TEntity entity)
    {
        await DbSet.AddAsync(entity);
        await Context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task UpdateAsync(TEntity entity)
    {
        DbSet.Update(entity);
        await Context.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(TEntity entity)
    {
        if (entity != null)
        {
            DbSet.Remove(entity);
            await Context.SaveChangesAsync();
        }
    }
}
