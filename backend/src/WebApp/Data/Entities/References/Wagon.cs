using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Data.Entities.References;

[Table("справочник_вагоны")]
public class Wagon
{
    [Key]
    public Guid Id { get; set; }
    
    [Column("nomer")] public int Number { get; set; } // Номер

    [Column("way")] [StringLength(255)] public string Way { get; set; } = string.Empty; // Путь

    [Column("pripiska")] [StringLength(1)] public string? Assignment { get; set; } // Приписка

    [Column("vladelec")] public int? OwnerId { get; set; } // Владелец

    [Column("koddorogi")]
    [StringLength(10)]
    public string? RailwayCode { get; set; } // Код дороги

    [Column("gruzopodemnost")] public double? LoadCapacity { get; set; } // Грузоподъемность

    [Column("tara")] public double? Tare { get; set; } // Тара

    [Column("carzavnom_id")]
    [StringLength(8)]
    public string? CarFactoryNumberId { get; set; } // Заводской номер вагона

    [Column("carpostr_dt")] public DateTime? CarConstructionDate { get; set; } // Дата постройки вагона

    [Column("carmarka_vl")]
    [StringLength(15)]
    public string? CarBrand { get; set; } // Марка вагона

    [Column("carty_vl")]
    [StringLength(30)]
    public string? CarType { get; set; } // Тип вагона

    [Column("cargryz_vl")] public double? CarLoadCapacityVol { get; set; } // Грузоподъемность вагона (объем)

    [Column("cartara_vl")] public double? CarTareVolume { get; set; } // Тара вагона (объем)

    [Column("carzav_id")] public int? CarFactoryId { get; set; } // ID завода вагона

    [Column("carosiling_vl")] public int? CarAxleLoad { get; set; } // Осевая нагрузка вагона

    [Column("carvizdyx_vl")]
    [StringLength(10)]
    public string? CarAirDistributor { get; set; } // Воздухораспределитель вагона

    [Column("cartorm_vl")]
    [StringLength(10)]
    public string? CarBrake { get; set; } // Тормоз вагона

    [Column("carpoglapar_vl")]
    [StringLength(20)]
    public string? CarAbsorberDevice { get; set; } // Поглощающий аппарат вагона

    [Column("carpoglaparadd_vl")]
    [StringLength(20)]
    public string? CarAbsorberDeviceAdd { get; set; } // Дополнительный поглощающий аппарат вагона

    [Column("cartele_vl")]
    [StringLength(10)]
    public string? CarTele { get; set; } // Тележка вагона

    [Column("docautor_id")]
    [StringLength(20)]
    public string? DocAuthorId { get; set; } // ID автора документа

    [Column("docdate_dt")] public DateTime? DocDate { get; set; } // Дата документа

    [Column("carosi_vl")] public double? CarAxles { get; set; } // Оси вагона

    [Column("carkolpat_vl")]
    [StringLength(10)]
    public string? CarWheelset { get; set; } // Колесные пары вагона

    [Column("regnom")] [StringLength(15)] public string? RegNumber { get; set; } // Регистрационный номер

    [Column("regnom_dt")] public DateTime? RegNumberDate { get; set; } // Дата регистрационного номера

    [Column("regnom_org")]
    [StringLength(20)]
    public string? RegNumberOrg { get; set; } // Организация, выдавшая рег. номер

    [Column("emk_vl")] public double? Capacity { get; set; } // Емкость

    [Column("napol_vl")] public decimal? FillingLevel { get; set; } // Уровень наполнения

    [Column("caruser_vl")] public int? CarUser { get; set; } // Пользователь вагона

    [Column("caruseraddnor_vl")] public int? CarUserAddNorm { get; set; } // Дополнительная норма пользователя вагона

    [Column("caruserbeg_dt")] public DateTime? CarUserStartDate { get; set; } // Дата начала использования вагона

    [Column("carusernot_dt")] public DateTime? CarUserNoticeDate { get; set; } // Дата уведомления пользователя вагона

    [Column("create_dt")] public DateTime? CreateDate { get; set; } // Дата создания

    [Column("create_us")]
    [StringLength(20)]
    public string? CreateUser { get; set; } // Пользователь, создавший запись

    [Column("modified_dt")] public DateTime? ModifiedDate { get; set; } // Дата изменения

    [Column("modified_us")]
    [StringLength(20)]
    public string? ModifiedUser { get; set; } // Пользователь, изменивший запись

    [Column("cartara_vl_old")] public double? OldCarTareVolume { get; set; } // Старая тара вагона (объем)

    [Column("ves_vl")] public decimal? WeightVolume { get; set; } // Вес (объем)

    [Column("cartar_vl")] public decimal? CarTareWeight { get; set; } // Тара вагона (вес)

    [Column("car_ds")] [StringLength(255)] public string? CarDescription { get; set; } // Описание вагона

    [Column("carinv")] [StringLength(50)] public string? CarInventory { get; set; } // Инвентарный номер вагона

    [Column("caruseraddnor_id")]
    [StringLength(10)]
    public string? CarUserAddNormId { get; set; } // ID доп. нормы пользователя вагона

    [Column("caruseraddnor_dt")]
    public DateTime? CarUserAddNormDate { get; set; } // Дата доп. нормы пользователя вагона

    [Column("datappe")] public DateTime? DataPPE { get; set; } // Дата ППЭ

    [Column("deystvuet")] public bool IsActive { get; set; } // Действует

    [Column("tip")] [StringLength(6)] public string? Type { get; set; } // Тип

    [Column("normaprobega")] public int? MileageNorm { get; set; } // Норма пробега

    [Column("arenda")] public bool IsLeased { get; set; } // Аренда

    [Column("суг")] [StringLength(3)] public string? SUG { get; set; } // СУГ

    [Column("класс")] [StringLength(1)] public string? Class { get; set; } // Класс

    [Column("давление")] public double? Pressure { get; set; } // Давление
}