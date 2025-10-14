import permissions from "../../permissions.json" with { type: "json" };

class PermissionsCodec {
    constructor() {
        this.permissions = permissions;
        this.permsFlipped = {
            server: this.flipObject(this.permissions.server),
            room: this.flipObject(this.permissions.room),
            _scopedef: this.flipObject(this.permissions._scopedef)
        };
    }

    encode(server, room) {
        const s = Array.from(server);
        const r = Array.from(room);

        const encodedServer =
            s.length > 0 ? this.encodeFromArray(this.permissions._scopedef.server, s) : "";
        const encodedRoom =
            s.length > 0 ? this.encodeFromArray(this.permissions._scopedef.room, r) : "";

        return encodedServer + encodedRoom;
    }

    encodeFromArray(id, array) {
        let string = `+${id}`;

        array.forEach(
            permission => (string += this.permissions[this.permsFlipped._scopedef[id]][permission])
        );

        return string;
    }

    decode(string) {
        let server = new Set();
        let room = new Set();

        let groups = string.match(/.{1,2}/g);

        let checkingFor;
        let checkingMode;

        let checked = new Set();

        groups.forEach(group => {
            if (group.startsWith("+")) {
                const checkingId = group.replace("+", "");
                checkingFor = this.permsFlipped._scopedef[checkingId];
                checkingMode = "add";
                if (checked.has(checkingFor)) {
                    checkingFor = null;
                    checkingMode = null;
                }
                checked.add(checkingFor);
            } else if (group.startsWith("-")) {
                const checkingId = group.replace("-", "");
                checkingFor = this.permsFlipped._scopedef[checkingId];
                checkingMode = "remove";

                if (checked.has(checkingFor)) {
                    checkingFor = null;
                    checkingMode = null;
                }

                if (checkingFor == "server") Object.keys(this.permissions.server).forEach(perm => server.add(perm))
                if (checkingFor == "room") Object.keys(this.permissions.room).forEach(perm => room.add(perm));
            } else if (checkingMode == "add") {
                if (checkingFor == "server")
                    server.add(this.permsFlipped.server[group]);
                if (checkingFor == "room")
                    room.add(this.permsFlipped.room[group]);
            } else if (checkingMode == "remove") {
                if (checkingFor == "server") server.delete(this.permsFlipped.server[group]);
                if (checkingFor == "room") room.delete(this.permsFlipped.room[group]);
            }
        });

        return {server, room};
    }

    flipObject(obj) {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
        }, {});
    }
}

export default PermissionsCodec;
