class Game {
    constructor(api_) {
        this.api = api_;

        this.width = $(window).width();
        this.height = $(window).height();

        this.players = [
            new Player("21321", 10, 10, "Player_1"),
            //   new Player("bdqwdqw", this.canvas, 200, 10, "Player_2"),
        ]

        this.viewport = new Viewport(5000, 5000, 0, 0);
    }

    draw() {
        this.players.forEach(player => {
            player.Draw(this.viewport);
        });
    }

    update() {
        let newPlayers = this.api.fetchPlayers();
        newPlayers.forEach(player => {
            var current_player = this.players.find(p => {
                return p.id == player.id;
            })
            if (current_player != null) {

                current_player.Update(player)

            } else {
                this.players.push(new Player(
                    player.id,
                    player.posX,
                    player.posY,
                    player.name,
                ))
            }
        });



    }
}