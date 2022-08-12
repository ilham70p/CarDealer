using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealer.Models
{
    public class Feature
    {
        [Key]
        public int Id { get; set; }
        public bool ABS { get; set; }
        public bool AirCondition { get; set; }
        public bool Radio { get; set; }
        public bool Locking { get; set; }
        public bool Immobilizer { get; set; }
        public bool PowerSteering { get; set; }
        public bool RearSensor { get; set; }
        public bool Xenon { get; set; }
        public bool ABSAirBag { get; set; }
        public bool Alloy { get; set; }
        public bool Assist { get; set; }
        public bool Cruise { get; set; }
        public bool Navigation { get; set; }
        public bool PowerWindow { get; set; }
        public bool SteeringAdjust { get; set; }
        [ForeignKey("CarModel")]
        public int CarModelId { get; set; }
        public CarModel CarModel { get; set; }
    }
}
