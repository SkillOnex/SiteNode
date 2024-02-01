const UpdateGrupo  = require("../model/UpdateGruposModel");

exports.updateGroup = async function (req, res) {
    try {
        const userreg = new UpdateGrupo(req.body);
        await userreg.update();

        if (userreg.erros.length > 0) {
            req.flash("erros", userreg.erros);
            req.session.save(function () {
                return res.redirect("/");
            });
            return;
        }
        req.flash("success", 'Grupo Atualizado com Sucesso.');
        req.session.save(function () {
            return res.redirect("/");
        });
    } catch (e) {
        console.log(e);
        return res.render("404");
    }
};