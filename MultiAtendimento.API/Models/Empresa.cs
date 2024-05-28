using Microsoft.EntityFrameworkCore;

namespace MultiAtendimento.API.Models
{
    [PrimaryKey(nameof(Id), nameof(Cnpj))]
    public class Empresa : BaseModel
    {
        public string Cnpj { get; set; }
        public string Nome { get; set; }
    }
}
