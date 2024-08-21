## Discord.js v14 Boş Bot Altyapısı

Bu repo, Discord.js v14 ile kendi Discord botunuzu kolayca geliştirmeniz için temiz ve düzenli bir başlangıç noktası sunar. 

### Özellikler

- **Discord.js v14:** Discord API'nin en güncel sürümüyle uyumlu, en yeni özelliklerden ve geliştirmelerden yararlanmanızı sağlar.
- **Kolay Kurulum:** Karmaşık ayarlar olmadan, sadece birkaç adımda botunuzu çalıştırın.
- **Temiz Kod:** Okunabilir ve düzenli kod yapısı, botunuzun işlevlerini anlamayı ve genişletmeyi kolaylaştırır.

### Başlangıç

1. **Projeyi Çoğaltın:**
   ```bash
   git clone https://github.com/qanteSm/discordjs-bos-v14-altyapi.git
   ```

2. **Gerekli Paketleri Yükleyin:**
   ```bash
   cd discordjs-bos-v14-altyapi
   npm install
   ```

3. **`config.js` Dosyasını Yapılandırın:**
   - `token` alanını [Discord Geliştirici Portalı](https://discord.com/developers/applications) üzerinden aldığınız botunuzun tokeniyle değiştirin.
   - `prefix` alanını botunuzun komutlarını tetiklemek için kullanacağınız önek ile değiştirin.
   - `owner` alanını kendi Discord kullanıcı ID'niz ile değiştirin.

   ```javascript
   module.exports = {
    prefix: "qantesm!",
    owner: "KULLANICI ID",
    token: "TOKEN GİRİNİZ",
   };

   ```

4. **Botu Başlatın:**
   ```bash
   node .
   ```

### Discord API Hakkında Daha Fazla Bilgi Edinin

Discord botları oluşturmak için daha fazla bilgi edinmek ve Discord API'nin olanaklarını keşfetmek istiyorsanız, resmi [Discord Geliştirici Belgeleri](https://discord.com/developers/docs/intro)'ni ziyaret edebilirsiniz. Burada, bot oluşturma hakkında ayrıntılı rehberler, API referansı ve daha pek çok kaynak bulabilirsiniz.

### Katkıda Bulunma

Her türlü katkıya açığız! Herhangi bir hata bulursanız veya yeni özellikler eklemek isterseniz, lütfen bir Pull Request göndermekten çekinmeyin.

---
