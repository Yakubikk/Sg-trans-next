using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class CountryService
{
    private readonly IBaseRepository<Country> _countryRepository;

    public CountryService(ICountryRepository countryRepository)
    {
        _countryRepository = countryRepository;
    }

    public async Task<IEnumerable<Country>> GetAllCountriesAsync()
    {
        return await _countryRepository.GetAllAsync();
    }

    public async Task<Country?> GetCountryByIdAsync(Guid id)
    {
        return await _countryRepository.GetByIdAsync(id);
    }

    public async Task<Country> CreateCountryAsync(Country country)
    {
        country.Id = Guid.NewGuid();
        return await _countryRepository.CreateAsync(country);
    }

    public async Task UpdateCountryAsync(Country country)
    {
        await _countryRepository.UpdateAsync(country);
    }

    public async Task DeleteCountryAsync(Guid id)
    {
        var country = await _countryRepository.GetByIdAsync(id);
        if (country != null)
        {
            await _countryRepository.DeleteAsync(country);
        }
    }
}