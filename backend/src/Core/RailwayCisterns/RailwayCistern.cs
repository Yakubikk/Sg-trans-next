namespace Core.RailwayCisterns;

public class RailwayCistern
{
    public Guid Id { get; set; }
    public ulong Number { get; set; }
    public DateOnly BuildDate { get; set; }
    public double TareWeight { get; set; }
    public double LoadCapacity { get; set; }
    public int LengthAlongTheAxes { get; set; }
    public int AxisCount { get; set; }
    public double CapacityVolume { get; set; }
    public double FillingVolume { get; set; }
    public double InitialTareWeight { get; set; }
    // public DateOnly CommissioningDate { get; set; }
    public string FactoryNumber { get; set; }
    public string RegistrationNumber { get; set; }
    public DateOnly RegistrationDate { get; set; }
    public string Notes { get; set; }

    public Guid ManufacturerId { get; set; }
    public Manufacturer Manufacturer { get; set; }
    public Guid RegistrarId { get; set; }
    public Registrar Registrar { get; set; }
    public Guid VesselId { get; set; }
    public Vessel Vessel { get; set; }
    public Guid WagonModelId { get; set; }
    public WagonModel WagonModel { get; set; }
    public Guid WagonTypeId { get; set; }
    public WagonType WagonType { get; set; }

    public bool DoesNotMeetStandartsOfRF
    {
        get
        {
            throw new NotImplementedException();
        }
    }
    
    public bool NotSubjectToRental
    {
        get
        {
            throw new NotImplementedException();
        }
    }
}