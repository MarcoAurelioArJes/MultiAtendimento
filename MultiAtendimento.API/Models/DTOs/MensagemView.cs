﻿using System.ComponentModel.DataAnnotations.Schema;

namespace MultiAtendimento.API.Models.DTOs
{
    public class MensagemView
    {
        public int Id { get; set; }
        public int ChatId { get; set; }
        public string Conteudo { get; set; }
        public string Remetente { get; set; }
    }
}
