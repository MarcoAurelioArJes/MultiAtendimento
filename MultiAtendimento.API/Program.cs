using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MultiAtendimento.API.Hubs;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Repository;
using MultiAtendimento.API.Repository.BancoDeDados;
using MultiAtendimento.API.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddSignalR();

builder.Services.AddDbContext<ContextoDoBancoDeDados>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IHttpContextAccessor,  HttpContextAccessor>();

builder.Services.AddSingleton<ListaDeChatsTemporaria>();

builder.Services.AddScoped<IChatRepository, ChatRepository>();
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IEmpresaRepository, EmpresaRepository>();
builder.Services.AddScoped<ISetorRepository, SetorRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();


builder.Services.AddScoped<ChatService>();
builder.Services.AddScoped<ClienteService>();
builder.Services.AddScoped<EmpresaService>();
builder.Services.AddScoped<SetorService>();
builder.Services.AddScoped<UsuarioService>();

builder.Services
       .AddAuthentication(opcs =>
       {
           opcs.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
           opcs.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
       })
       .AddJwtBearer(opcs =>
       {
           opcs.RequireHttpsMetadata = true;
           opcs.SaveToken = true;
           opcs.TokenValidationParameters = new TokenValidationParameters
           {
               IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(TokenService.PrivateKey)),
               ValidateIssuer = false,
               ValidateAudience = false
           };

           opcs.Events = new JwtBearerEvents
           {
               OnMessageReceived = context =>
               {
                   var accessToken = context.Request.Query["access_token"];

                   var path = context.HttpContext.Request.Path;
                   if (!string.IsNullOrEmpty(accessToken) &&
                       (path.StartsWithSegments("/chat")))
                   {
                       context.Token = accessToken;
                   }
                   return Task.CompletedTask;
               }
           };
       });

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder => builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .SetIsOriginAllowed((hosts) => true));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("CORSPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chat");

app.Run();