Teknik:
Öğrenci listeleme işlemini zaten yapmıştık, öğrenci kayıt işlemini kullanıcıdan alınan dinamik verilerle yapmalısınız.
Örneğin localhost:3000/student/add/{name}/{age}/{midterm-grade}/{final-grade} gibi bir yol izlenebilir. Veya henüz konuşmadık ama post datası üzerinden almak isteyenler alabilir(opsiyonel)
Ardından öğrencileri getirme işlemini zaten yapmıştık. localhost:3000/student/{id} şeklinde. Bu data içerisinde öğrencinin not ortalamasını da göstereceğiz. (average: midterm+final/2)
const express=require("express");: Express framework'ünü projeye dahil eder. Express, Node.js tabanlı web uygulamaları oluşturmak için popüler bir framework'tür.
Bizden istenilenler bu şekildeydi.

dbConnection.getConnection((err, connection) => { ... });: MySQL veritabanına bağlantı sağlar. Eğer bağlantı başarılı olursa, bir connection nesnesi alır ve "Database connected" mesajını konsola yazdırır.
Aksi takdirde, "Database connection error" mesajını konsola yazdırır.
Burada kayıt işlemimi gerçekleştiriyorum.
app.get("/students/add/:name/:age/:midterm/:final", (req, res) => { ... });: Express uygulamasında bir GET isteği tanımlar. 
Bu istek, "/students/add/:name/:age/:midterm/:final" URL'sine geldiğinde çalışır. Bu URL parametrelerini alır ve veritabanına bir öğrenci kaydı ekler.

dbConnection.query("INSERT INTO students ... );: MySQL veritabanında bir INSERT sorgusu çalıştırır. Bu sorgu, gelen parametreleri kullanarak "students" tablosuna yeni bir öğrenci ekler.

app.listen(3000, () => { ... });: Portta dinleme işlemini bu şeklide yapıyoruz
Bu işlemler sonucunda MYSQLWorkbench'imde eklenen verileri görüntüleyebildim.



