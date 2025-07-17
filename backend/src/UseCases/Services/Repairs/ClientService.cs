using Core.Abstractions.Repositories;
using Core.Abstractions.Repositories.Repairs;
using Core.Repairs;

namespace UseCases.Services.Repairs;

public class ClientService
{
    private readonly IBaseRepository<Client> _clientRepository;

    public ClientService(IClientRepository clientRepository)
    {
        _clientRepository = clientRepository;
    }

    public async Task<IEnumerable<Client>> GetAllClientsAsync()
    {
        return await _clientRepository.GetAllAsync();
    }

    public async Task<Client?> GetClientByIdAsync(Guid id)
    {
        return await _clientRepository.GetByIdAsync(id);
    }

    public async Task<Client> CreateClientAsync(Client client)
    {
        client.Id = Guid.NewGuid();
        return await _clientRepository.CreateAsync(client);
    }

    public async Task UpdateClientAsync(Client client)
    {
        await _clientRepository.UpdateAsync(client);
    }

    public async Task DeleteClientAsync(Guid id)
    {
        var client = await _clientRepository.GetByIdAsync(id);
        if (client != null)
        {
            await _clientRepository.DeleteAsync(client);
        }
    }
}
