'use strict';

angular.module('Application.factory', [])

.factory("Coins", [function($scope) {
    return {
      supported: [
        {
            preorder: true,
            name:"Bithereum",
            shortname:"bithereum",
            comingsoon: [
            ],
            highlights: [
                "Controllable through a single mobile application",
                "Presynced pruned blockchain",
                "Ability to track BTH balance as well as receive BTH within device range",
                "Ready to run Proof-of-Uptime out-of-the-box",
                "Built in node tool with PoU tier charts",
                "Small, lightweight, and easy to bring with you anywhere",
            ]
        },
        {
            preorder: true,
            name:"Ethereum",
            shortname:"ethereum",
            comingsoon: [
                "Flyp.me and Morphtoken API plug-ins for quick crypto exchanging",
                "Rocket Pool compatiblity for eventual PoS",
                "ERC-20 compatiblity"
            ],
            highlights: [
                "Controllable through a single mobile application",
                "Presynced pruned blockchain",
                "Ability to track ETH balance as well as receive ETH within device range",
                "Small, lightweight, and easy to bring with you anywhere",
            ]
        },
        {
            preorder: true,
            name:"Bitcoin",
            shortname:"bitcoin",
            comingsoon: [
                "Flyp.me and Morphtoken API plug-ins for quick crypto exchanging"
            ],
            highlights: [
                "Controllable through a single mobile application",
                "Presynced pruned blockchain",
                "Ability to track BTC balance as well as receive BTC within device range",
                "Small, lightweight, and easy to bring with you anywhere",
            ]
        },
        // {
        //     preorder: true,
        //     name:"Binance Chain",
        //     shortname: "binance",
        //     comingsoon: [
        //         "Ability to send within device range in next app update",
        //         "Encrypted remote receiving, sending, and balance updates coming soon in nimblePremium",
        //     ],
        //     highlights: [
        //         "Controllable through a single mobile application",
        //         "Presynced pruned blockchain",
        //         "Ability to track BNB balance as well as receive BNB within device range",
        //         "Small, lightweight, and easy to bring with you anywhere",
        //         "Compatiblity with Binance Chain based projects"
        //     ]
        // },
        {
            preorder: true,
            name:"Bitcoin Gold",
            shortname:"bitcoingold",
            comingsoon: [
            ],
            highlights: [
                "Controllable through a single mobile application",
                "Presynced pruned blockchain",
                "Ability to track BTG balance as well as receive BTG within device range",
                "Small, lightweight, and easy to bring with you anywhere",
            ]
        },
        {
            preorder: true,
            name:"Bitcoin Cash",
            shortname:"bitcoincash",
            comingsoon: [
                "Flyp.me and Morphtoken API plug-ins for quick crypto exchanging",
            ],
            highlights: [
                "Controllable through a single mobile application",
                "Presynced pruned blockchain",
                "Ability to track BCH balance as well as receive BCH within device range",
                "Small, lightweight, and easy to bring with you anywhere",
            ]
        },
        {
            preorder: true,
            name:"Bitcoin SV",
            shortname:"bitcoinsv",
            comingsoon: [
            ],
            highlights: [
                "Controllable through a single mobile application",
                "Presynced pruned blockchain",
                "Ability to track BSV balance as well as receive BSV within device range",
                "Small, lightweight, and easy to bring with you anywhere",
            ]
        },
      ]
    }
}])
