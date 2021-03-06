function create_avatar(api_) {
    var avatar = {
        naam: "",
        tikker: false,
        api: api_,
        styles: {},
        // Stuur je naam naar de server.
        zet_naam: function zet_naam(naam) {
            api.set_name(naam);
        },
        // Ga een stapje naar links.
        ga_links: function ga_links() {
            api.move_left();
        },
        // Ga een stapje naar boven.
        ga_boven: function ga_boven() {
            api.move_up();
        },
        // Ga een stapje naar rechts.
        ga_rechts: function ga_rechts() {
            api.move_right();
        },
        // Ga een stapje naar onder.
        ga_onder: function ga_onder() {
            api.move_down();
        },
        // Stuur je styles naar de server.
        stuur_styles: function stuur_styles() {
            api.set_styles(this.styles);
        },
        // Stel een plaatje in als achtergrond.
        zet_plaatje: function zet_plaatje(url) {
            this.styles['background-image'] = 'url(' + url + ')'
            api.set_styles({'background-image': this.styles['background-image']})
        }
    }

    // Socket berichten.
    api.socket.on("connect", function connect() {
        console.info("Je bent verbonden.")
    })
    api.socket.on("get_name", function get_name(name) {
        avatar.naam = name
    })

    api.socket.on("tag", function tag(is_tikker) {
        if (is_tikker) {
            console.log("Je bent de tikker.")
        }
        else {
            console.log("Je bent geen tikker meer.")
        }
        avatar.tikker = true
    })

    api.socket.on("input_error", function (err) {
        console.error(err)
    })

    api.set_avatar_styles = function(new_styles) {
        avatar.styles = new_styles
    }

    return avatar;
}

