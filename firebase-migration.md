## Items do migrate from Adonis to firebase.


##### Controllers

- [ ] app/Controllers/Http/AuthController.js
- [ ] app/Controllers/Http/ConfigController.js
- [ ] app/Controllers/Http/FaqController.js
- [ ] app/Controllers/Http/- [ ] FavoriteLocationController.js
- [ ] app/Controllers/Http/ImageController.js
- [ ] app/Controllers/Http/LocationController.js
- [ ] app/Controllers/Http/MarkProcedureController.- [ ] js
- [ ] app/Controllers/Http/NotificationController.- [ ] js
- [ ] app/Controllers/Http/PorteController.js
- [ ] app/Controllers/Http/ProcedureController.js
- [ ] app/Controllers/Http/- [ ] ProcedureMemberController.js
- [ ] app/Controllers/Http/ReportController.js
- [ ] app/Controllers/Http/SessionController.js
- [ ] app/Controllers/Http/UserController.js

#####  Models

- [ ] app/Models/Config.js
- [ ] app/Models/Faq.js
- [ ] app/Models/FavoriteLocation.js
- [ ] app/Models/Image.js
- [ ] app/Models/Location.js
- [ ] app/Models/MarkedProcedure.js
- [ ] app/Models/Notification.js
- [ ] app/Models/Patient.js
- [ ] app/Models/Porte.js
- [ ] app/Models/Procedure.js
- [ ] app/Models/ProcedureLocation.js
- [ ] app/Models/ProcedureMember.js
- [ ] app/Models/Token.js
- [ ] app/Models/User.js

#### Services

- [ ] app/Services/CleanupReports.js
- [ ] app/Services/Config.js
- [ ] app/Services/Csv.js
- [ ] app/Services/Email.js
- [ ] app/Services/Links.js
- [ ] app/Services/Location.js
- [ ] app/Services/Notification.js
- [ ] app/Services/Pdf.js
- [ ] app/Services/ProcedureStatus.js
- [ ] app/Services/PushNotification.js
- [ ] app/Services/Queue.js
- [ ] app/Services/ReportData.js

#### Routes #####


Route.group(() => {
  Route.post("/images", "ImageController.store"); //.middleware(['auth'])
  Route.post("/register", "UserController.register").validator("StoreUser");
  Route.post("/register/social/:social_type", "UserController.registerSocial");
  Route.post("/users/search/", "UserController.search")
    .middleware(["auth"])
    .validator("Search");
}).prefix("api/v1"); //.domain('app.drmarkey.com.br').prefix('api/v1')

Route.group(() => {
  Route.post("/", "AuthController.login");
  Route.post("/forgot", "AuthController.forgotPassword");
  Route.post("/activate", "AuthController.activateUser");
  Route.post("/update-password", "AuthController.updatePassword");
}).prefix("api/v1/auth");

Route.group(() => {
  Route.put("/", "UserController.update");
  Route.put("/player", "UserController.player");
  Route.get("/favorite/location", "FavoriteLocationController.index");
  Route.post("/favorite/location", "FavoriteLocationController.store");
  Route.post("/config", "ConfigController.create");
  Route.get("/config", "ConfigController.index");
  Route.delete(
    "/favorite/location",
    "FavoriteLocationController.removeFavorite"
  );
})
  .prefix("api/v1/profile")
  .middleware(["auth"]);

Route.group(() => {
  Route.get("/", "MarkProcedureController.index");
  Route.get("/details/:procedure_id", "MarkProcedureController.show");
  Route.get("/my", "MarkProcedureController.teamPlayer");
  Route.post("/mark", "MarkProcedureController.markProcedure");
  Route.put("/mark", "MarkProcedureController.markProcedure");
  Route.post("/team", "MarkProcedureController.addTeamMember");
  Route.delete("/team", "MarkProcedureController.removeTeamMember");
  Route.post("/patient", "MarkProcedureController.changePatient");
  Route.delete("/cancel", "MarkProcedureController.cancelProcedure");
  Route.put("/confirm", "MarkProcedureController.confirmProcedure");
  Route.post("/location", "MarkProcedureController.changeLocation");
  Route.post("/procedure-type", "MarkProcedureController.changeProcedure");
  Route.put("/invite-response", "ProcedureMemberController.inviteResponse");
})
  .prefix("api/v1/procedure")
  .middleware(["auth"]); //.domain('app.drmarkey.com.br').prefix('api/v1')

Route.group(() => {
  Route.get("/", "NotificationController.index");
  Route.put("/read/:notification_id", "NotificationController.read");
  Route.put("/archive/:notification_id", "NotificationController.archive");

  //Route.get("/details/:notification_id", "MarkProcedureController.show");
  //Route.get("/read/:notification_id", "MarkProcedureController.teamPlayer");
})
  .prefix("api/v1/notification")
  .middleware(["auth"]); //.domain('app.drmarkey.com.br').prefix('api/v1')

Route.group(() => {
  Route.post("/google", "LocationController.findLocation");
})
  .prefix("api/v1/locations")
  .middleware(["auth"]); //.domain('app.drmarkey.com.br').prefix('api/v1')

Route.group(() => {
  Route.post("/procedures", "ReportController.generatePdf");
})
  .prefix("api/v1/reports")
  .middleware(["auth"]); //.domain('app.drmarkey.com.br').prefix('api/v1')

Route.group(() => {
  Route.get("/", "ProcedureController.index").middleware(["auth"]);
  Route.post("/search", "ProcedureController.search")
    .middleware(["auth"])
    .validator("Search");
})
  .prefix("api/v1/procedure-type")
  .middleware(["auth"]); //.domain('app.drmarkey.com.br').prefix('api/v1')

Route.group(() => {
  Route.get("/users", "UserController.list");
  Route.get("/marked_procedures", "MarkProcedureController.list");
  Route.post("/faqs", "FaqController.create");
  Route.delete("faqs/:id", "FaqController.delete");
  Route.get("/faqs", "FaqController.index");
})
  .prefix("api/v1/admin")
  .middleware(["auth" , "react-admin"]); //.domain('app.drmarkey.com.br').prefix('api/v1')

Route.group(() => {
  Route.get("/faq", "FaqController.index");
}).prefix("api/v1/public");
