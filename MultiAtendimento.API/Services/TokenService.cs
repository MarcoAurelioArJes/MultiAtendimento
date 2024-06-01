using Microsoft.IdentityModel.Tokens;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MultiAtendimento.API.Services
{
    public class TokenService
    {
        public const string PrivateKey = "MIIEoQIBAAKCAQByOZgPN5pbXaR+M/jrt+jG71t9BSBp7dD6ZjYSmED82ZTUuFPJ\r\nBLhm+uLQk1aEwOqpwhxI9Q40u8LTXHvosrIW/OS8zYZHDwH1nfmfsBK78qA0PodI\r\naeA3MaVakhNpjLeUOqUV38bIz+2HmYkw04GRgl3d+4nksiPE0Q/KSEwfxBSUW8yx\r\npd50Q4Yx2j7b9ZQl+DDg031ZZJbCe8Aeg1vwD4iAzfvpuwdOcZx5KkcAIxEG34wF\r\n1KC4NbjpAf9KzihBslDWvA81Xz7VqLqckkn30BJ2r3w5CmKrNWjwrE2z2T6ysDCi\r\nlnBOjYF6G0uscIExfeq9c/eFmHjvIfaroLmdAgMBAAECggEAauwUtfHjkLEIgIZf\r\n9S7TPBzktBOvctkFrM8uwJs7AjUeRz1AWMQNZYBl/r5c16nKQBwO5BBYOu6jgbxp\r\n1LopULFr4Hw2vJ+EwwkcmOl1r+9/HUiG1Dcfhir30N86QqxRT/TRgbdWWbWhcDQ9\r\norHp8G5rNZb3TleeeecE8+JXN8fRHjorkgKYfjBselTcX0u0579qBSHJWvNSxYz6\r\nhORTYi3zyhvBX/vnIvEhyxu33VlYyeNDm44o1DEhXMgmAcG8xD9aU8nQ7BVieskQ\r\nBOzK2m+EJLn5MEeC0yXVdpynqAw+tRu9xVjpgemlIzsE7nE1SkEoc68fkkIBT8xd\r\nFwPA1QKBgQCs5X4JVI7NlT2pTuyPBcOp+WdDeietZcWgINZ/YXQgzcOSx4f92k6Y\r\nNXrubSJLwibSgUxsyUSTL/bUvWUPJ1XNho4DdyYSWaucLomlIO1y4WSR2m8VxJwb\r\n1eKhmtOCn5x35zngs0psQs5OnKxbw9tLqTGewdXK3vprWknOjyZUawKBgQCpILZe\r\n+1VGTqAhjcxWbgysmHyKA9fbKmFTT0rw3j90/pQpM45lVZZCYFU/xmC2L/Ry0h+p\r\nbxtakXSjEnswFfNjcs16DHr29lL1H24xJU9R6xtkJkwrGwewCR6uOpNu2VlDKSTN\r\nRz1ddPsDlvrvldT+iOSVLGoRyasFMt9WvzZsFwKBgBNVwseGVkX1V6T0d43zBhOf\r\nGYY5RfClPfmPUo2CN3tnp2RlvfaMkFeDO5EoUTqJps/Jt+M+itWu+nqGB6QvMPBA\r\nCOeoTnCk6IUZyzjVOtirDhUliWC00QRn4eVSrC6ibNwX1qgjRMJgojO2X6wPdhm6\r\n/RqU8LS0ROr2eOSJq66rAoGAHb9CNGyScB5OLfip0x3iHs1nQkMwyTyoB6YvsTP2\r\nB1brql+GES6/kgctl10GD6VZooRwyzVeo0xoLnKGtkt2FqzPlULysdNbff+8Ouqs\r\nC+WFWNUfmolTjdPc0Jo+6kVSXOy0q2J3WaPErrn0gwVghDCBu/cm5OAKs4xiGfjh\r\n0psCgYBDZMPEucSUYRgaJz/Cp778K2UhBE0ulHh4JLzfCYbvxo2VIs3P28wB6JN4\r\nVIrXE63gPvZNziQwH5pnk4mb+LH8JKGRtVqEVsOMkyqXaovVY2vDlgoxDu/oLnEW\r\nWt9ks3CcTUiC/dqO81QEdIuBWoWLXUBFxEqx6yrErCrvradKgg==";

        public static EntrarView ObterInformacoesDoLogin(Usuario usuario)
        {
            var chaveSimetrica = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(PrivateKey));

            var credenciais = new SigningCredentials(chaveSimetrica, SecurityAlgorithms.HmacSha256Signature);

            var claims = new Claim[]
            {
                new Claim("id", usuario.Id.ToString()),
                new Claim("setorId", usuario.SetorId.ToString()),
                new Claim("empresaCnpj", usuario.EmpresaCnpj.ToString()),
                new Claim(ClaimTypes.Role, usuario.Cargo.ToString()),
            };

            var jwtToken = new JwtSecurityToken(
                expires: DateTime.Now.AddHours(10),
                claims: claims,
                signingCredentials: credenciais
            );

            var jwtHandler = new JwtSecurityTokenHandler();

            var entrarView = new EntrarView
            {
                TokenDeAcesso = jwtHandler.WriteToken(jwtToken),
                TipoDoToken = "Bearer",
                ExpiraEm = jwtToken.Payload.ValidTo
            };

            return entrarView;
        }
    }
}
