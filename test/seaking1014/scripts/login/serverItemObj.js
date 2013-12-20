var serverItemObject = {
    "gid": "ServerItem",
    "active": true,
    "visible": true,
    "layer": null,
    "transform": {
        "x": 20,
        "y": 28,
        "regX": 0,
        "regY": 0,
        "scaleX": 1,
        "scaleY": 1,
        "skewX": 0,
        "skewY": 0,
        "rotation": 0,
        "alpha": 1
    },
    "children": [
        {
            "gid": "StateIcon",
            "active": true,
            "visible": true,
            "layer": null,
            "transform": {
                "x": 11,
                "y": 16,
                "regX": 0,
                "regY": 0,
                "scaleX": 1,
                "scaleY": 1,
                "skewX": 0,
                "skewY": 0,
                "rotation": 0,
                "alpha": 1
            },
            "children": [],
            "components": [
                {
                    "cid": "renderer.JSONTextureRenderer",
                    "properties": {
                        "texture": "resources/texture/UI_login.tt",
                        "index": "3"
                    }
                }
            ]
        },
        {
            "gid": "State",
            "active": true,
            "visible": true,
            "layer": null,
            "transform": {
                "x": 47,
                "y": 12,
                "regX": 0,
                "regY": 0,
                "scaleX": 1,
                "scaleY": 1,
                "skewX": 0,
                "skewY": 0,
                "rotation": 0,
                "alpha": 1
            },
            "children": [],
            "components": [
                {
                    "cid": "renderer.JSONTextureRenderer",
                    "properties": {
                        "texture": "resources/texture/UI_login.tt",
                        "index": "10"
                    }
                }
            ]
        },
        {
            "gid": "ServerName",
            "active": true,
            "visible": true,
            "layer": null,
            "transform": {
                "x": 189,
                "y": 28,
                "regX": 0,
                "regY": 0,
                "scaleX": 1,
                "scaleY": 1,
                "skewX": 0,
                "skewY": 0,
                "rotation": 0,
                "alpha": 1
            },
            "children": [],
            "components": [
                {
                    "cid": "base.Text",
                    "properties": {
                        "text": "时空",
                        "color": "#EB3A00",
                        "font": "bold 28px STHeiti,黑体",
                        "baseline": "middle",
                        "align": "center"
                    }
                }
            ]
        },
        {
            "gid": "Character",
            "active": true,
            "visible": true,
            "layer": null,
            "transform": {
                "x": 321,
                "y": 29,
                "regX": 0,
                "regY": 0,
                "scaleX": 1,
                "scaleY": 1,
                "skewX": 0,
                "skewY": 0,
                "rotation": 0,
                "alpha": 1
            },
            "children": [],
            "components": [
                {
                    "cid": "base.Text",
                    "properties": {
                        "text": "无角色",
                        "color": "#BF854B",
                        "font": "normal 20px Arial,STHeiti,黑体",
                        "baseline": "middle",
                        "align": "center"
                    }
                }
            ]
        }
    ],
    "components": [
        {
            "cid": "base.NinePatchRenderer",
            "properties": {
                "texture": "resources/texture/UI_public.tt",
                "index": "17",
                "width": "420",
                "height": "60",
                "patchTop": 19,
                "patchBottom": 19,
                "patchLeft": 19,
                "patchRight": 19,
                "cache": false
            }
        }
    ]
};