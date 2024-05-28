using System.ComponentModel.DataAnnotations;

namespace MultiAtendimento.API.Models
{
    public class BaseModel
    {
        [Key]
        public int Id { get; set; }
    }
}
