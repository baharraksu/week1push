Teknik:
Öğrenci kayıt işlemini kullanıcıdan alınan dinamik verilerle yapıldı.
localhost:3000/student/add/{name}/{age}/{midterm-grade}/{final-grade} gibi bir yol izlendi.
İşlem sırasında midterm-grade ve final-grade in avarage'i alındı ve browserda gösterildi.

Bizden istenilenler bu şekildeydi.

dbConnection.getConnection((err, connection) => { ... });: MySQL veritabanına bağlantı sağlar. Eğer bağlantı başarılı olursa, bir connection nesnesi alır ve "Database connected" mesajını konsola yazdırır.
Aksi takdirde, "Database connection error" mesajını konsola yazdırır.
Burada kayıt işlemimi gerçekleştiriyorum.
app.get("/students/add/:name/:age/:midterm/:final", (req, res) => { ... });: Express uygulamasında bir GET isteği tanımlar. 
Bu istek, "/students/add/:name/:age/:midterm/:final" URL'sine geldiğinde çalışır. Bu URL parametrelerini alır ve veritabanına bir öğrenci kaydı ekler.

dbConnection.query("INSERT INTO students ... );: MySQL veritabanında bir INSERT sorgusu çalıştırır. Bu sorgu, gelen parametreleri kullanarak "students" tablosuna yeni bir öğrenci ekler.

app.listen(3000, () => { ... });: Portta dinleme işlemini bu şeklide yapıyoruz
Bu işlemler sonucunda MYSQLWorkbench'imde eklenen verileri görüntüleyebildim.



