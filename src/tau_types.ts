/**
 * A broadcaster updates their channel properties e.g., category, title, mature flag,
 * broadcast, or language.
 */
export interface ChannelUpdate {
    /**
     * The broadcasters user ID.
     */
    broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    broadcaster_user_name: string;
    /**
     * The channels category ID.
     */
    category_id: string;
    /**
     * The category name.
     */
    category_name: string;
    /**
     * A boolean identifying whether the channel is flagged as mature. Valid values
     * aretrueandfalse.
     */
    is_mature: boolean;
    /**
     * The channels broadcast language.
     */
    language: string;
    /**
     * The channels stream title.
     */
    title: string;
    [property: string]: any;
}

/**
 * A specified channel receives a follow.
 */
export interface ChannelFollow {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * RFC3339 timestamp of when the follow occurred.
     */
    followed_at: string;
    /**
     * The user ID for the user now following the specified channel.
     */
    user_id: string;
    /**
     * The user login for the user now following the specified channel.
     */
    user_login: string;
    /**
     * The user display name for the user now following the specified channel.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A notification when a specified channel receives a subscriber. This does not include
 * resubscribes.
 */
export interface ChannelSubscribe {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Whether the subscription is a gift.
     */
    is_gift: boolean;
    /**
     * The tier of the subscription. Valid values are 1000, 2000, and 3000.
     */
    tier: string;
    /**
     * The user ID for the user who subscribed to the specified channel.
     */
    user_id: string;
    /**
     * The user login for the user who subscribed to the specified channel.
     */
    user_login: string;
    /**
     * The user display name for the user who subscribed to the specified channel.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A notification when a subscription to the specified channel ends.
 */
export interface ChannelSubscriptionEnd {
    /**
     * The broadcaster user ID.
     */
    broadcaster_user_id: string;
    /**
     * The broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Whether the subscription was a gift.
     */
    is_gift: boolean;
    /**
     * The tier of the subscription that ended. Valid values are 1000, 2000, and 3000.
     */
    tier: string;
    /**
     * The user ID for the user whose subscription ended.
     */
    user_id: string;
    /**
     * The user login for the user whose subscription ended.
     */
    user_login: string;
    /**
     * The user display name for the user whose subscription ended.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A notification when a viewer gives a gift subscription to one or more users in the
 * specified channel.
 */
export interface ChannelSubscriptionGift {
    /**
     * The broadcaster user ID.
     */
    broadcaster_user_id: string;
    /**
     * The broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The number of subscriptions gifted by this user in the channel. This value is null for
     * anonymous gifts or if the gifter has opted out of sharing this information.
     */
    cumulative_total: number;
    /**
     * Whether the subscription gift was anonymous.
     */
    is_anonymous: boolean;
    /**
     * The tier of subscriptions in the subscription gift.
     */
    tier: string;
    /**
     * The number of subscriptions in the subscription gift.
     */
    total: number;
    /**
     * The user ID of the user who sent the subscription gift. Set to null if it was an
     * anonymous subscription gift.
     */
    user_id: string;
    /**
     * The user login of the user who sent the gift. Set to null if it was an anonymous
     * subscription gift.
     */
    user_login: string;
    /**
     * The user display name of the user who sent the gift. Set to null if it was an anonymous
     * subscription gift.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A notification when a user sends a resubscription chat message in a specific channel.
 */
export interface ChannelSubscriptionMessage {
    /**
     * The broadcaster user ID.
     */
    broadcaster_user_id: string;
    /**
     * The broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The total number of months the user has been subscribed to the channel.
     */
    cumulative_months: number;
    /**
     * The month duration of the subscription.
     */
    duration_months: number;
    /**
     * An object that contains the resubscription message and emote information needed to
     * recreate the message.
     */
    message: Message;
    /**
     * The number of consecutive months the users current subscription has been active. This
     * value is null if the user has opted out of sharing this information.
     */
    streak_months: number;
    /**
     * The tier of the users subscription.
     */
    tier: string;
    /**
     * The user ID of the user who sent a resubscription chat message.
     */
    user_id: string;
    /**
     * The user login of the user who sent a resubscription chat message.
     */
    user_login: string;
    /**
     * The user display name of the user who a resubscription chat message.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * An object that contains the resubscription message and emote information needed to
 * recreate the message.
 */
export interface Message {
    /**
     * An array that includes the emote ID and start and end positions for where the emote
     * appears in the text.
     */
    emotes: Emote[];
    /**
     * The text of the resubscription chat message.
     */
    text: string;
    [property: string]: any;
}

export interface Emote {
    /**
     * The index of where the Emote starts in the text.
     */
    begin: number;
    /**
     * The index of where the Emote ends in the text.
     */
    end: number;
    /**
     * The emote ID.
     */
    id: string;
    [property: string]: any;
}

/**
 * A user cheers on the specified channel.
 */
export interface ChannelCheer {
    /**
     * The number of bits cheered.
     */
    bits: number;
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Whether the user cheered anonymously or not.
     */
    is_anonymous: boolean;
    /**
     * The message sent with the cheer.
     */
    message: string;
    /**
     * The user ID for the user who cheered on the specified channel. This is null
     * ifis_anonymousis true.
     */
    user_id: string;
    /**
     * The user login for the user who cheered on the specified channel. This is null
     * ifis_anonymousis true.
     */
    user_login: string;
    /**
     * The user display name for the user who cheered on the specified channel. This is null
     * ifis_anonymousis true.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A broadcaster raids another broadcasters channel.
 */
export interface ChannelRaid {
    /**
     * The broadcaster ID that created the raid.
     */
    from_broadcaster_user_id: string;
    /**
     * The broadcaster login that created the raid.
     */
    from_broadcaster_user_login: string;
    /**
     * The broadcaster display name that created the raid.
     */
    from_broadcaster_user_name: string;
    /**
     * The broadcaster ID that received the raid.
     */
    to_broadcaster_user_id: string;
    /**
     * The broadcaster login that received the raid.
     */
    to_broadcaster_user_login: string;
    /**
     * The broadcaster display name that received the raid.
     */
    to_broadcaster_user_name: string;
    /**
     * The number of viewers in the raid.
     */
    viewers: number;
    [property: string]: any;
}

/**
 * A viewer is banned from the specified channel.
 */
export interface ChannelBan {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Will be null if permanent ban. If it is a timeout, this field shows when the timeout will
     * end.
     */
    ends_at: string;
    /**
     * Indicates whether the ban is permanent (true) or a timeout (false). If true, ends_at will
     * be null.
     */
    is_permanent: boolean;
    /**
     * The user ID of the issuer of the ban.
     */
    moderator_user_id: string;
    /**
     * The user login of the issuer of the ban.
     */
    moderator_user_login: string;
    /**
     * The user name of the issuer of the ban.
     */
    moderator_user_name: string;
    /**
     * The reason behind the ban.
     */
    reason: string;
    /**
     * The user ID for the user who was banned on the specified channel.
     */
    user_id: string;
    /**
     * The user login for the user who was banned on the specified channel.
     */
    user_login: string;
    /**
     * The user display name for the user who was banned on the specified channel.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A viewer is unbanned from the specified channel.
 */
export interface ChannelUnban {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The user ID of the issuer of the unban.
     */
    moderator_user_id: string;
    /**
     * The user login of the issuer of the unban.
     */
    moderator_user_login: string;
    /**
     * The user name of the issuer of the unban.
     */
    moderator_user_name: string;
    /**
     * The user id for the user who was unbanned on the specified channel.
     */
    user_id: string;
    /**
     * The user login for the user who was unbanned on the specified channel.
     */
    user_login: string;
    /**
     * The user display name for the user who was unbanned on the specified channel.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * Moderator privileges were added to a user on a specified channel.
 */
export interface ChannelModeratorAdd {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The user ID of the new moderator.
     */
    user_id: string;
    /**
     * The user login of the new moderator.
     */
    user_login: string;
    /**
     * The display name of the new moderator.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * Moderator privileges were removed from a user on a specified channel.
 */
export interface ChannelModeratorRemove {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The user ID of the removed moderator.
     */
    user_id: string;
    /**
     * The user login of the removed moderator.
     */
    user_login: string;
    /**
     * The display name of the removed moderator.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A custom channel points reward has been created for the specified channel.
 */
export interface ChannelChannelPointsCustomRewardAdd {
    /**
     * Custom background color for the reward. Format: Hex with # prefix. Example:#FA1ED2.
     */
    background_color: string;
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Timestamp of the cooldown expiration.nullif the reward isnt on cooldown.
     */
    cooldown_expires_at: string;
    /**
     * The reward cost.
     */
    cost: number;
    /**
     * Set of default images of 1x, 2x and 4x sizes for the reward.
     */
    default_image: ChannelChannelPointsCustomRewardAddDefaultImage;
    /**
     * Whether a cooldown is enabled and what the cooldown is in seconds.
     */
    global_cooldown: ChannelChannelPointsCustomRewardAddGlobalCooldown;
    /**
     * The reward identifier.
     */
    id: string;
    /**
     * Set of custom images of 1x, 2x and 4x sizes for the reward. Can benullif no images have
     * been uploaded.
     */
    image: ChannelChannelPointsCustomRewardAddImage;
    /**
     * Is the reward currently enabled. If false, the reward wont show up to viewers.
     */
    is_enabled: boolean;
    /**
     * Is the reward currently in stock. If false, viewers cant redeem.
     */
    is_in_stock: boolean;
    /**
     * Is the reward currently paused. If true, viewers cant redeem.
     */
    is_paused: boolean;
    /**
     * Does the viewer need to enter information when redeeming the reward.
     */
    is_user_input_required: boolean;
    /**
     * Whether a maximum per stream is enabled and what the maximum is.
     */
    max_per_stream: ChannelChannelPointsCustomRewardAddMaxPerStream;
    /**
     * Whether a maximum per user per stream is enabled and what the maximum is.
     */
    max_per_user_per_stream: ChannelChannelPointsCustomRewardAddMaxPerUserPerStream;
    /**
     * The reward description.
     */
    prompt: string;
    /**
     * The number of redemptions redeemed during the current live stream. Counts against
     * themax_per_streamlimit.nullif the broadcasters stream isnt live ormax_per_streamisnt
     * enabled.
     */
    redemptions_redeemed_current_stream: number;
    /**
     * Should redemptions be set tofulfilledstatus immediately when redeemed and skip the
     * request queue instead of the normalunfulfilledstatus.
     */
    should_redemptions_skip_request_queue: boolean;
    /**
     * The reward title.
     */
    title: string;
    [property: string]: any;
}

/**
 * Set of default images of 1x, 2x and 4x sizes for the reward.
 */
export interface ChannelChannelPointsCustomRewardAddDefaultImage {
    /**
     * URL for the image at 1x size.
     */
    url_1x: string;
    /**
     * URL for the image at 2x size.
     */
    url_2x: string;
    /**
     * URL for the image at 4x size.
     */
    url_4x: string;
    [property: string]: any;
}

/**
 * Whether a cooldown is enabled and what the cooldown is in seconds.
 */
export interface ChannelChannelPointsCustomRewardAddGlobalCooldown {
    /**
     * Is the setting enabled.
     */
    is_enabled: boolean;
    /**
     * The cooldown in seconds.
     */
    seconds: number;
    [property: string]: any;
}

/**
 * Set of custom images of 1x, 2x and 4x sizes for the reward. Can benullif no images have
 * been uploaded.
 */
export interface ChannelChannelPointsCustomRewardAddImage {
    /**
     * URL for the image at 1x size.
     */
    url_1x: string;
    /**
     * URL for the image at 2x size.
     */
    url_2x: string;
    /**
     * URL for the image at 4x size.
     */
    url_4x: string;
    [property: string]: any;
}

/**
 * Whether a maximum per stream is enabled and what the maximum is.
 */
export interface ChannelChannelPointsCustomRewardAddMaxPerStream {
    /**
     * Is the setting enabled.
     */
    is_enabled: boolean;
    /**
     * The max per stream limit.
     */
    value: number;
    [property: string]: any;
}

/**
 * Whether a maximum per user per stream is enabled and what the maximum is.
 */
export interface ChannelChannelPointsCustomRewardAddMaxPerUserPerStream {
    /**
     * Is the setting enabled.
     */
    is_enabled: boolean;
    /**
     * The max per user per stream limit.
     */
    value: number;
    [property: string]: any;
}

/**
 * A custom channel points reward has been updated for the specified channel.
 */
export interface ChannelChannelPointsCustomRewardUpdate {
    /**
     * Custom background color for the reward. Format: Hex with # prefix. Example:#FA1ED2.
     */
    background_color: string;
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Timestamp of the cooldown expiration.nullif the reward isnt on cooldown.
     */
    cooldown_expires_at: string;
    /**
     * The reward cost.
     */
    cost: number;
    /**
     * Set of default images of 1x, 2x and 4x sizes for the reward.
     */
    default_image: ChannelChannelPointsCustomRewardUpdateDefaultImage;
    /**
     * Whether a cooldown is enabled and what the cooldown is in seconds.
     */
    global_cooldown: ChannelChannelPointsCustomRewardUpdateGlobalCooldown;
    /**
     * The reward identifier.
     */
    id: string;
    /**
     * Set of custom images of 1x, 2x and 4x sizes for the reward. Can benullif no images have
     * been uploaded.
     */
    image: ChannelChannelPointsCustomRewardUpdateImage;
    /**
     * Is the reward currently enabled. If false, the reward wont show up to viewers.
     */
    is_enabled: boolean;
    /**
     * Is the reward currently in stock. If false, viewers cant redeem.
     */
    is_in_stock: boolean;
    /**
     * Is the reward currently paused. If true, viewers cant redeem.
     */
    is_paused: boolean;
    /**
     * Does the viewer need to enter information when redeeming the reward.
     */
    is_user_input_required: boolean;
    /**
     * Whether a maximum per stream is enabled and what the maximum is.
     */
    max_per_stream: ChannelChannelPointsCustomRewardUpdateMaxPerStream;
    /**
     * Whether a maximum per user per stream is enabled and what the maximum is.
     */
    max_per_user_per_stream: ChannelChannelPointsCustomRewardUpdateMaxPerUserPerStream;
    /**
     * The reward description.
     */
    prompt: string;
    /**
     * The number of redemptions redeemed during the current live stream. Counts against
     * themax_per_streamlimit.nullif the broadcasters stream isnt live ormax_per_streamisnt
     * enabled.
     */
    redemptions_redeemed_current_stream: number;
    /**
     * Should redemptions be set tofulfilledstatus immediately when redeemed and skip the
     * request queue instead of the normalunfulfilledstatus.
     */
    should_redemptions_skip_request_queue: boolean;
    /**
     * The reward title.
     */
    title: string;
    [property: string]: any;
}

/**
 * Set of default images of 1x, 2x and 4x sizes for the reward.
 */
export interface ChannelChannelPointsCustomRewardUpdateDefaultImage {
    /**
     * URL for the image at 1x size.
     */
    url_1x: string;
    /**
     * URL for the image at 2x size.
     */
    url_2x: string;
    /**
     * URL for the image at 4x size.
     */
    url_4x: string;
    [property: string]: any;
}

/**
 * Whether a cooldown is enabled and what the cooldown is in seconds.
 */
export interface ChannelChannelPointsCustomRewardUpdateGlobalCooldown {
    /**
     * Is the setting enabled.
     */
    is_enabled: boolean;
    /**
     * The cooldown in seconds.
     */
    seconds: number;
    [property: string]: any;
}

/**
 * Set of custom images of 1x, 2x and 4x sizes for the reward. Can benullif no images have
 * been uploaded.
 */
export interface ChannelChannelPointsCustomRewardUpdateImage {
    /**
     * URL for the image at 1x size.
     */
    url_1x: string;
    /**
     * URL for the image at 2x size.
     */
    url_2x: string;
    /**
     * URL for the image at 4x size.
     */
    url_4x: string;
    [property: string]: any;
}

/**
 * Whether a maximum per stream is enabled and what the maximum is.
 */
export interface ChannelChannelPointsCustomRewardUpdateMaxPerStream {
    /**
     * Is the setting enabled.
     */
    is_enabled: boolean;
    /**
     * The max per stream limit.
     */
    value: number;
    [property: string]: any;
}

/**
 * Whether a maximum per user per stream is enabled and what the maximum is.
 */
export interface ChannelChannelPointsCustomRewardUpdateMaxPerUserPerStream {
    /**
     * Is the setting enabled.
     */
    is_enabled: boolean;
    /**
     * The max per user per stream limit.
     */
    value: number;
    [property: string]: any;
}

/**
 * A custom channel points reward has been removed from the specified channel.
 */
export interface ChannelChannelPointsCustomRewardRemove {
    /**
     * Custom background color for the reward. Format: Hex with # prefix. Example:#FA1ED2.
     */
    background_color: string;
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Timestamp of the cooldown expiration.nullif the reward isnt on cooldown.
     */
    cooldown_expires_at: string;
    /**
     * The reward cost.
     */
    cost: number;
    /**
     * Set of default images of 1x, 2x and 4x sizes for the reward.
     */
    default_image: ChannelChannelPointsCustomRewardRemoveDefaultImage;
    /**
     * Whether a cooldown is enabled and what the cooldown is in seconds.
     */
    global_cooldown: ChannelChannelPointsCustomRewardRemoveGlobalCooldown;
    /**
     * The reward identifier.
     */
    id: string;
    /**
     * Set of custom images of 1x, 2x and 4x sizes for the reward. Can benullif no images have
     * been uploaded.
     */
    image: ChannelChannelPointsCustomRewardRemoveImage;
    /**
     * Is the reward currently enabled. If false, the reward wont show up to viewers.
     */
    is_enabled: boolean;
    /**
     * Is the reward currently in stock. If false, viewers cant redeem.
     */
    is_in_stock: boolean;
    /**
     * Is the reward currently paused. If true, viewers cant redeem.
     */
    is_paused: boolean;
    /**
     * Does the viewer need to enter information when redeeming the reward.
     */
    is_user_input_required: boolean;
    /**
     * Whether a maximum per stream is enabled and what the maximum is.
     */
    max_per_stream: ChannelChannelPointsCustomRewardRemoveMaxPerStream;
    /**
     * Whether a maximum per user per stream is enabled and what the maximum is.
     */
    max_per_user_per_stream: ChannelChannelPointsCustomRewardRemoveMaxPerUserPerStream;
    /**
     * The reward description.
     */
    prompt: string;
    /**
     * The number of redemptions redeemed during the current live stream. Counts against
     * themax_per_streamlimit.nullif the broadcasters stream isnt live ormax_per_streamisnt
     * enabled.
     */
    redemptions_redeemed_current_stream: number;
    /**
     * Should redemptions be set tofulfilledstatus immediately when redeemed and skip the
     * request queue instead of the normalunfulfilledstatus.
     */
    should_redemptions_skip_request_queue: boolean;
    /**
     * The reward title.
     */
    title: string;
    [property: string]: any;
}

/**
 * Set of default images of 1x, 2x and 4x sizes for the reward.
 */
export interface ChannelChannelPointsCustomRewardRemoveDefaultImage {
    /**
     * URL for the image at 1x size.
     */
    url_1x: string;
    /**
     * URL for the image at 2x size.
     */
    url_2x: string;
    /**
     * URL for the image at 4x size.
     */
    url_4x: string;
    [property: string]: any;
}

/**
 * Whether a cooldown is enabled and what the cooldown is in seconds.
 */
export interface ChannelChannelPointsCustomRewardRemoveGlobalCooldown {
    /**
     * Is the setting enabled.
     */
    is_enabled: boolean;
    /**
     * The cooldown in seconds.
     */
    seconds: number;
    [property: string]: any;
}

/**
 * Set of custom images of 1x, 2x and 4x sizes for the reward. Can benullif no images have
 * been uploaded.
 */
export interface ChannelChannelPointsCustomRewardRemoveImage {
    /**
     * URL for the image at 1x size.
     */
    url_1x: string;
    /**
     * URL for the image at 2x size.
     */
    url_2x: string;
    /**
     * URL for the image at 4x size.
     */
    url_4x: string;
    [property: string]: any;
}

/**
 * Whether a maximum per stream is enabled and what the maximum is.
 */
export interface ChannelChannelPointsCustomRewardRemoveMaxPerStream {
    /**
     * Is the setting enabled.
     */
    is_enabled: boolean;
    /**
     * The max per stream limit.
     */
    value: number;
    [property: string]: any;
}

/**
 * Whether a maximum per user per stream is enabled and what the maximum is.
 */
export interface ChannelChannelPointsCustomRewardRemoveMaxPerUserPerStream {
    /**
     * Is the setting enabled.
     */
    is_enabled: boolean;
    /**
     * The max per user per stream limit.
     */
    value: number;
    [property: string]: any;
}

/**
 * A viewer has redeemed a custom channel points reward on the specified channel.
 */
export interface ChannelChannelPointsCustomRewardRedemptionAdd {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The redemption identifier.
     */
    id: string;
    /**
     * RFC3339 timestamp of when the reward was redeemed.
     */
    redeemed_at: string;
    /**
     * Basic information about the reward that was redeemed, at the time it was redeemed.
     */
    reward: ChannelChannelPointsCustomRewardRedemptionAddReward;
    /**
     * Defaults tounfulfilled. Possible values areunknown,unfulfilled,fulfilled, andcanceled.
     */
    status: string;
    /**
     * User ID of the user that redeemed the reward.
     */
    user_id: string;
    /**
     * The user input provided. Empty string if not provided.
     */
    user_input: string;
    /**
     * Login of the user that redeemed the reward.
     */
    user_login: string;
    /**
     * Display name of the user that redeemed the reward.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * Basic information about the reward that was redeemed, at the time it was redeemed.
 */
export interface ChannelChannelPointsCustomRewardRedemptionAddReward {
    /**
     * The reward cost.
     */
    cost: number;
    /**
     * The reward identifier.
     */
    id: string;
    /**
     * The reward description.
     */
    prompt: string;
    /**
     * The reward name.
     */
    title: string;
    [property: string]: any;
}

/**
 * A redemption of a channel points custom reward has been updated for the specified channel.
 */
export interface ChannelChannelPointsCustomRewardRedemptionUpdate {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The redemption identifier.
     */
    id: string;
    /**
     * RFC3339 timestamp of when the reward was redeemed.
     */
    redeemed_at: string;
    /**
     * Basic information about the reward that was redeemed, at the time it was redeemed.
     */
    reward: ChannelChannelPointsCustomRewardRedemptionUpdateReward;
    /**
     * Will befulfilledorcanceled. Possible values areunknown,unfulfilled,fulfilled, andcanceled.
     */
    status: string;
    /**
     * User ID of the user that redeemed the reward.
     */
    user_id: string;
    /**
     * The user input provided. Empty string if not provided.
     */
    user_input: string;
    /**
     * Login of the user that redeemed the reward.
     */
    user_login: string;
    /**
     * Display name of the user that redeemed the reward.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * Basic information about the reward that was redeemed, at the time it was redeemed.
 */
export interface ChannelChannelPointsCustomRewardRedemptionUpdateReward {
    /**
     * The reward cost.
     */
    cost: number;
    /**
     * The reward identifier.
     */
    id: string;
    /**
     * The reward description.
     */
    prompt: string;
    /**
     * The reward name.
     */
    title: string;
    [property: string]: any;
}

/**
 * A poll started on a specified channel.
 */
export interface ChannelPollBegin {
    /**
     * The Bits voting settings for the poll.
     */
    bits_voting: ChannelPollBeginBitsVoting;
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The Channel Points voting settings for the poll.
     */
    channel_points_voting: ChannelPollBeginChannelPointsVoting;
    /**
     * An array of choices for the poll.
     */
    choices: ChannelPollBeginChoice[];
    /**
     * The time the poll will end.
     */
    ends_at: string;
    /**
     * ID of the poll.
     */
    id: string;
    /**
     * The time the poll started.
     */
    started_at: string;
    /**
     * Question displayed for the poll.
     */
    title: string;
    [property: string]: any;
}

/**
 * The Bits voting settings for the poll.
 */
export interface ChannelPollBeginBitsVoting {
    /**
     * Number of Bits required to vote once with Bits.
     */
    amount_per_vote: number;
    /**
     * Indicates if Bits can be used for voting.
     */
    is_enabled: boolean;
    [property: string]: any;
}

/**
 * The Channel Points voting settings for the poll.
 */
export interface ChannelPollBeginChannelPointsVoting {
    /**
     * Number of Channel Points required to vote once with Channel Points.
     */
    amount_per_vote: number;
    /**
     * Indicates if Channel Points can be used for voting.
     */
    is_enabled: boolean;
    [property: string]: any;
}

export interface ChannelPollBeginChoice {
    /**
     * Number of votes received via Bits.
     */
    bits_votes: number;
    /**
     * Number of votes received via Channel Points.
     */
    channel_points_votes: number;
    /**
     * ID for the choice.
     */
    id: string;
    /**
     * Text displayed for the choice.
     */
    title: string;
    /**
     * Total number of votes received for the choice across all methods of voting.
     */
    votes: number;
    [property: string]: any;
}

/**
 * Users respond to a poll on a specified channel.
 */
export interface ChannelPollProgress {
    /**
     * The Bits voting settings for the poll.
     */
    bits_voting: ChannelPollProgressBitsVoting;
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The Channel Points voting settings for the poll.
     */
    channel_points_voting: ChannelPollProgressChannelPointsVoting;
    /**
     * An array of choices for the poll. Includes vote counts.
     */
    choices: ChannelPollProgressChoice[];
    /**
     * The time the poll will end.
     */
    ends_at: string;
    /**
     * ID of the poll.
     */
    id: string;
    /**
     * The time the poll started.
     */
    started_at: string;
    /**
     * Question displayed for the poll.
     */
    title: string;
    [property: string]: any;
}

/**
 * The Bits voting settings for the poll.
 */
export interface ChannelPollProgressBitsVoting {
    /**
     * Number of Bits required to vote once with Bits.
     */
    amount_per_vote: number;
    /**
     * Indicates if Bits can be used for voting.
     */
    is_enabled: boolean;
    [property: string]: any;
}

/**
 * The Channel Points voting settings for the poll.
 */
export interface ChannelPollProgressChannelPointsVoting {
    /**
     * Number of Channel Points required to vote once with Channel Points.
     */
    amount_per_vote: number;
    /**
     * Indicates if Channel Points can be used for voting.
     */
    is_enabled: boolean;
    [property: string]: any;
}

export interface ChannelPollProgressChoice {
    /**
     * Number of votes received via Bits.
     */
    bits_votes: number;
    /**
     * Number of votes received via Channel Points.
     */
    channel_points_votes: number;
    /**
     * ID for the choice.
     */
    id: string;
    /**
     * Text displayed for the choice.
     */
    title: string;
    /**
     * Total number of votes received for the choice across all methods of voting.
     */
    votes: number;
    [property: string]: any;
}

/**
 * A poll ended on a specified channel.
 */
export interface ChannelPollEnd {
    /**
     * The Bits voting settings for the poll.
     */
    bits_voting: ChannelPollEndBitsVoting;
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The Channel Points voting settings for the poll.
     */
    channel_points_voting: ChannelPollEndChannelPointsVoting;
    /**
     * An array of choices for the poll. Includes vote counts.
     */
    choices: ChannelPollEndChoice[];
    /**
     * The time the poll ended.
     */
    ended_at: string;
    /**
     * ID of the poll.
     */
    id: string;
    /**
     * The time the poll started.
     */
    started_at: string;
    /**
     * The status of the poll. Valid values are completed, archived, and terminated.
     */
    status: string;
    /**
     * Question displayed for the poll.
     */
    title: string;
    [property: string]: any;
}

/**
 * The Bits voting settings for the poll.
 */
export interface ChannelPollEndBitsVoting {
    /**
     * Number of Bits required to vote once with Bits.
     */
    amount_per_vote: number;
    /**
     * Indicates if Bits can be used for voting.
     */
    is_enabled: boolean;
    [property: string]: any;
}

/**
 * The Channel Points voting settings for the poll.
 */
export interface ChannelPollEndChannelPointsVoting {
    /**
     * Number of Channel Points required to vote once with Channel Points.
     */
    amount_per_vote: number;
    /**
     * Indicates if Channel Points can be used for voting.
     */
    is_enabled: boolean;
    [property: string]: any;
}

export interface ChannelPollEndChoice {
    /**
     * Number of votes received via Bits.
     */
    bits_votes: number;
    /**
     * Number of votes received via Channel Points.
     */
    channel_points_votes: number;
    /**
     * ID for the choice.
     */
    id: string;
    /**
     * Text displayed for the choice.
     */
    title: string;
    /**
     * Total number of votes received for the choice across all methods of voting.
     */
    votes: number;
    [property: string]: any;
}

/**
 * A Prediction started on a specified channel.
 */
export interface ChannelPredictionBegin {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Channel Points Prediction ID.
     */
    id: string;
    /**
     * The time the Channel Points Prediction will automatically lock.
     */
    locks_at: string;
    /**
     * An array of outcomes for the Channel Points Prediction.
     */
    outcomes: ChannelPredictionBeginOutcome[];
    /**
     * The time the Channel Points Prediction started.
     */
    started_at: string;
    /**
     * Title for the Channel Points Prediction.
     */
    title: string;
    [property: string]: any;
}

export interface ChannelPredictionBeginOutcome {
    /**
     * The total number of Channel Points used on this outcome.
     */
    channel_points: number;
    /**
     * The color for the outcome. Valid values are pink and blue.
     */
    color: string;
    /**
     * The outcome ID.
     */
    id: string;
    /**
     * The outcome title.
     */
    title: string;
    /**
     * An array of users who used the most Channel Points on this outcome.
     */
    top_predictors: PurpleTopPredictor[];
    /**
     * The number of users who used Channel Points on this outcome.
     */
    users: number;
    [property: string]: any;
}

export interface PurpleTopPredictor {
    /**
     * The number of Channel Points used to participate in the Prediction.
     */
    channel_points_used: number;
    /**
     * The number of Channel Points won. This value is always null in the event payload for
     * Prediction progress and Prediction lock. This value is 0 if the outcome did not win or if
     * the Prediction was canceled and Channel Points were refunded.
     */
    channel_points_won: number;
    /**
     * The ID of the user.
     */
    user_id: string;
    /**
     * The login of the user.
     */
    user_login: string;
    /**
     * The display name of the user.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * Users participated in a Prediction on a specified channel.
 */
export interface ChannelPredictionProgress {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Channel Points Prediction ID.
     */
    id: string;
    /**
     * The time the Channel Points Prediction will automatically lock.
     */
    locks_at: string;
    /**
     * An array of outcomes for the Channel Points Prediction. Includes top_predictors.
     */
    outcomes: ChannelPredictionProgressOutcome[];
    /**
     * The time the Channel Points Prediction started.
     */
    started_at: string;
    /**
     * Title for the Channel Points Prediction.
     */
    title: string;
    [property: string]: any;
}

export interface ChannelPredictionProgressOutcome {
    /**
     * The total number of Channel Points used on this outcome.
     */
    channel_points: number;
    /**
     * The color for the outcome. Valid values are pink and blue.
     */
    color: string;
    /**
     * The outcome ID.
     */
    id: string;
    /**
     * The outcome title.
     */
    title: string;
    /**
     * An array of users who used the most Channel Points on this outcome.
     */
    top_predictors: FluffyTopPredictor[];
    /**
     * The number of users who used Channel Points on this outcome.
     */
    users: number;
    [property: string]: any;
}

export interface FluffyTopPredictor {
    /**
     * The number of Channel Points used to participate in the Prediction.
     */
    channel_points_used: number;
    /**
     * The number of Channel Points won. This value is always null in the event payload for
     * Prediction progress and Prediction lock. This value is 0 if the outcome did not win or if
     * the Prediction was canceled and Channel Points were refunded.
     */
    channel_points_won: number;
    /**
     * The ID of the user.
     */
    user_id: string;
    /**
     * The login of the user.
     */
    user_login: string;
    /**
     * The display name of the user.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A Prediction was locked on a specified channel.
 */
export interface ChannelPredictionLock {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * Channel Points Prediction ID.
     */
    id: string;
    /**
     * The time the Channel Points Prediction was locked.
     */
    locked_at: string;
    /**
     * An array of outcomes for the Channel Points Prediction. Includes top_predictors.
     */
    outcomes: ChannelPredictionLockOutcome[];
    /**
     * The time the Channel Points Prediction started.
     */
    started_at: string;
    /**
     * Title for the Channel Points Prediction.
     */
    title: string;
    [property: string]: any;
}

export interface ChannelPredictionLockOutcome {
    /**
     * The total number of Channel Points used on this outcome.
     */
    channel_points: number;
    /**
     * The color for the outcome. Valid values are pink and blue.
     */
    color: string;
    /**
     * The outcome ID.
     */
    id: string;
    /**
     * The outcome title.
     */
    title: string;
    /**
     * An array of users who used the most Channel Points on this outcome.
     */
    top_predictors: TentacledTopPredictor[];
    /**
     * The number of users who used Channel Points on this outcome.
     */
    users: number;
    [property: string]: any;
}

export interface TentacledTopPredictor {
    /**
     * The number of Channel Points used to participate in the Prediction.
     */
    channel_points_used: number;
    /**
     * The number of Channel Points won. This value is always null in the event payload for
     * Prediction progress and Prediction lock. This value is 0 if the outcome did not win or if
     * the Prediction was canceled and Channel Points were refunded.
     */
    channel_points_won: number;
    /**
     * The ID of the user.
     */
    user_id: string;
    /**
     * The login of the user.
     */
    user_login: string;
    /**
     * The display name of the user.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A Prediction ended on a specified channel.
 */
export interface ChannelPredictionEnd {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The time the Channel Points Prediction ended.
     */
    ended_at: string;
    /**
     * Channel Points Prediction ID.
     */
    id: string;
    /**
     * An array of outcomes for the Channel Points Prediction. Includes top_predictors.
     */
    outcomes: ChannelPredictionEndOutcome[];
    /**
     * The time the Channel Points Prediction started.
     */
    started_at: string;
    /**
     * The status of the Channel Points Prediction. Valid values are resolved and canceled.
     */
    status: string;
    /**
     * Title for the Channel Points Prediction.
     */
    title: string;
    /**
     * ID of the winning outcome.
     */
    winning_outcome_id: string;
    [property: string]: any;
}

export interface ChannelPredictionEndOutcome {
    /**
     * The total number of Channel Points used on this outcome.
     */
    channel_points: number;
    /**
     * The color for the outcome. Valid values are pink and blue.
     */
    color: string;
    /**
     * The outcome ID.
     */
    id: string;
    /**
     * The outcome title.
     */
    title: string;
    /**
     * An array of users who used the most Channel Points on this outcome.
     */
    top_predictors: StickyTopPredictor[];
    /**
     * The number of users who used Channel Points on this outcome.
     */
    users: number;
    [property: string]: any;
}

export interface StickyTopPredictor {
    /**
     * The number of Channel Points used to participate in the Prediction.
     */
    channel_points_used: number;
    /**
     * The number of Channel Points won. This value is always null in the event payload for
     * Prediction progress and Prediction lock. This value is 0 if the outcome did not win or if
     * the Prediction was canceled and Channel Points were refunded.
     */
    channel_points_won: number;
    /**
     * The ID of the user.
     */
    user_id: string;
    /**
     * The login of the user.
     */
    user_login: string;
    /**
     * The display name of the user.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A viewer donated to the charity campaign
 */
export interface ChannelCharityCampaignDonate {
    /**
     * An object that contains the amount of the user's donation.
     */
    amount: Amount;
    /**
     * An ID that uniquely identifies the broadcaster that's running the campaign.
     */
    broadcaster_id: string;
    /**
     * The broadcaster's login name.
     */
    broadcaster_login: string;
    /**
     * The broadcaster's display name.
     */
    broadcaster_name: string;
    /**
     * The Campaign ID.
     */
    campaign_id: string;
    /**
     * An ID that uniquely identifies the user that donated to the campaign.
     */
    user_id: string;
    /**
     * The user's login name.
     */
    user_login: string;
    /**
     * The user's display name.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * An object that contains the amount of the user's donation.
 */
export interface Amount {
    /**
     * The ISO-4217 three-letter currency code that identifies the type of currency in value.
     */
    currency: string;
    /**
     * The number of decimal places used by the currency. For example, USD uses two decimal
     * places. Use this number to translate value from minor units to major units by using the
     * formula:
     *
     * value / 10^decimal_places
     */
    decimal_places: number;
    /**
     * The monetary amount. The amount is specified in the currency's minor unit. For example,
     * the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550.
     */
    value: number;
    [property: string]: any;
}

/**
 * A broadcaster started a charity campaign.
 */
export interface ChannelCharityCampaignStart {
    /**
     * An ID that identifies the broadcaster that's running the campaign.
     */
    broadcaster_id: string;
    /**
     * The broadcaster's login name.
     */
    broadcaster_login: string;
    /**
     * The broadcaster's display name.
     */
    broadcaster_name: string;
    /**
     * A description of the charity.
     */
    charity_description: string;
    /**
     * A URL to an image of the charity's logo. The image's type is PNG and its size is 100px X
     * 100px.
     */
    charity_logo: string;
    /**
     * The charity's name.
     */
    charity_name: string;
    /**
     * A URL to the charity's website.
     */
    charity_website: string;
    /**
     * An object that contains the current amount of donations that the campaign has received.
     */
    current_amount: ChannelCharityCampaignStartCurrentAmount;
    /**
     * An ID that identifies the charity campaign.
     */
    id: string;
    /**
     * The UTC timestamp (in RFC3339 format) of when the broadcaster started the campaign.
     */
    started_at: string;
    /**
     * An object that contains the campaign's target fundraising goal.
     */
    target_amount: ChannelCharityCampaignStartTargetAmount;
    [property: string]: any;
}

/**
 * An object that contains the current amount of donations that the campaign has received.
 */
export interface ChannelCharityCampaignStartCurrentAmount {
    /**
     * The ISO-4217 three-letter currency code that identifies the type of currency in value.
     */
    currency: string;
    /**
     * The number of decimal places used by the currency. For example, USD uses two decimal
     * places. Use this number to translate value from minor units to major units by using the
     * formula:
     *
     * value / 10^decimal_places
     */
    decimal_places: number;
    /**
     * The monetary amount. The amount is specified in the currency's minor unit. For example,
     * the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550.
     */
    value: number;
    [property: string]: any;
}

/**
 * An object that contains the campaign's target fundraising goal.
 */
export interface ChannelCharityCampaignStartTargetAmount {
    /**
     * The ISO-4217 three-letter currency code that identifies the type of currency in value.
     */
    currency: string;
    /**
     * The number of decimal places used by the currency. For example, USD uses two decimal
     * places. Use this number to translate value from minor units to major units by using the
     * formula:
     *
     * value / 10^decimal_places
     */
    decimal_places: number;
    /**
     * The monetary amount. The amount is specified in the currency's minor unit. For example,
     * the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550.
     */
    value: number;
    [property: string]: any;
}

/**
 * Progress was made towards a broadcaster's charity campaign.
 */
export interface ChannelCharityCampaignProgress {
    /**
     * An ID that identifies the broadcaster that's running the campaign.
     */
    broadcaster_id: string;
    /**
     * The broadcaster's login name.
     */
    broadcaster_login: string;
    /**
     * The broadcaster's display name.
     */
    broadcaster_name: string;
    /**
     * A description of the charity.
     */
    charity_description: string;
    /**
     * A URL to an image of the charity's logo. The image's type is PNG and its size is 100px X
     * 100px.
     */
    charity_logo: string;
    /**
     * The charity's name.
     */
    charity_name: string;
    /**
     * A URL to the charity's website.
     */
    charity_website: string;
    /**
     * An object that contains the current amount of donations that the campaign has received.
     */
    current_amount: ChannelCharityCampaignProgressCurrentAmount;
    /**
     * An ID that identifies the charity campaign.
     */
    id: string;
    /**
     * An object that contains the campaign's target fundraising goal.
     */
    target_amount: ChannelCharityCampaignProgressTargetAmount;
    [property: string]: any;
}

/**
 * An object that contains the current amount of donations that the campaign has received.
 */
export interface ChannelCharityCampaignProgressCurrentAmount {
    /**
     * The ISO-4217 three-letter currency code that identifies the type of currency in value.
     */
    currency: string;
    /**
     * The number of decimal places used by the currency. For example, USD uses two decimal
     * places. Use this number to translate value from minor units to major units by using the
     * formula:
     *
     * value / 10^decimal_places
     */
    decimal_places: number;
    /**
     * The monetary amount. The amount is specified in the currency's minor unit. For example,
     * the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550.
     */
    value: number;
    [property: string]: any;
}

/**
 * An object that contains the campaign's target fundraising goal.
 */
export interface ChannelCharityCampaignProgressTargetAmount {
    /**
     * The ISO-4217 three-letter currency code that identifies the type of currency in value.
     */
    currency: string;
    /**
     * The number of decimal places used by the currency. For example, USD uses two decimal
     * places. Use this number to translate value from minor units to major units by using the
     * formula:
     *
     * value / 10^decimal_places
     */
    decimal_places: number;
    /**
     * The monetary amount. The amount is specified in the currency's minor unit. For example,
     * the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550.
     */
    value: number;
    [property: string]: any;
}

/**
 * Progress was made towards a broadcaster's charity campaign.
 */
export interface ChannelCharityCampaignStop {
    /**
     * An ID that identifies the broadcaster that's running the campaign.
     */
    broadcaster_id: string;
    /**
     * The broadcaster's login name.
     */
    broadcaster_login: string;
    /**
     * The broadcaster's display name.
     */
    broadcaster_name: string;
    /**
     * A description of the charity.
     */
    charity_description: string;
    /**
     * A URL to an image of the charity's logo. The image's type is PNG and its size is 100px X
     * 100px.
     */
    charity_logo: string;
    /**
     * The charity's name.
     */
    charity_name: string;
    /**
     * A URL to the charity's website.
     */
    charity_website: string;
    /**
     * An object that contains the final amount of donations that the campaign received.
     */
    current_amount: ChannelCharityCampaignStopCurrentAmount;
    /**
     * An ID that identifies the charity campaign.
     */
    id: string;
    /**
     * The UTC timestamp (in RFC3339 format) of when the broadcaster stopped the campaign.
     */
    stopped_at: string;
    /**
     * An object that contains the campaign's target fundraising goal.
     */
    target_amount: ChannelCharityCampaignStopTargetAmount;
    [property: string]: any;
}

/**
 * An object that contains the final amount of donations that the campaign received.
 */
export interface ChannelCharityCampaignStopCurrentAmount {
    /**
     * The ISO-4217 three-letter currency code that identifies the type of currency in value.
     */
    currency: string;
    /**
     * The number of decimal places used by the currency. For example, USD uses two decimal
     * places. Use this number to translate value from minor units to major units by using the
     * formula:
     *
     * value / 10^decimal_places
     */
    decimal_places: number;
    /**
     * The monetary amount. The amount is specified in the currency's minor unit. For example,
     * the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550.
     */
    value: number;
    [property: string]: any;
}

/**
 * An object that contains the campaign's target fundraising goal.
 */
export interface ChannelCharityCampaignStopTargetAmount {
    /**
     * The ISO-4217 three-letter currency code that identifies the type of currency in value.
     */
    currency: string;
    /**
     * The number of decimal places used by the currency. For example, USD uses two decimal
     * places. Use this number to translate value from minor units to major units by using the
     * formula:
     *
     * value / 10^decimal_places
     */
    decimal_places: number;
    /**
     * The monetary amount. The amount is specified in the currency's minor unit. For example,
     * the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550.
     */
    value: number;
    [property: string]: any;
}

/**
 * Get notified when a broadcaster begins a goal.
 */
export interface ChannelGoalBegin {
    /**
     * An ID that uniquely identifies the broadcaster.
     */
    broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    broadcaster_user_name: string;
    /**
     * The goal's current value.
     */
    current_amount: number;
    /**
     * A description of the goal, if specified. The description may contain a maximum of 40
     * characters.
     */
    description: string;
    /**
     * An ID that identifies this event.
     */
    id: string;
    /**
     * The UTC timestamp in RFC 3339 format, which indicates when the broadcaster created the
     * goal.
     */
    started_at: string;
    /**
     * The goal's target value. For example, if the broadcaster has 200 followers before
     * creating the goal, and their goal is to double that number, this field is set to 400.
     */
    target_amount: number;
    /**
     * The type of goal. Can be follow, subscription, subscription_count, new_subscription, or
     * new_subscription_count
     */
    type: string;
    [property: string]: any;
}

/**
 * Get notified when progress (either positive or negative) is made towards a broadcasters
 * goal.
 */
export interface ChannelGoalProgress {
    /**
     * An ID that uniquely identifies the broadcaster.
     */
    broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    broadcaster_user_name: string;
    /**
     * The goal's current value.
     */
    current_amount: number;
    /**
     * A description of the goal, if specified. The description may contain a maximum of 40
     * characters.
     */
    description: string;
    /**
     * An ID that identifies this event.
     */
    id: string;
    /**
     * The UTC timestamp in RFC 3339 format, which indicates when the broadcaster created the
     * goal.
     */
    started_at: string;
    /**
     * The goal's target value. For example, if the broadcaster has 200 followers before
     * creating the goal, and their goal is to double that number, this field is set to 400.
     */
    target_amount: number;
    /**
     * The type of goal. Can be follow, subscription, subscription_count, new_subscription, or
     * new_subscription_count
     */
    type: string;
    [property: string]: any;
}

/**
 * Get notified when a broadcaster ends a goal.
 */
export interface ChannelGoalEnd {
    /**
     * An ID that uniquely identifies the broadcaster.
     */
    broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    broadcaster_user_name: string;
    /**
     * The goal's current value.
     */
    current_amount: number;
    /**
     * A description of the goal, if specified. The description may contain a maximum of 40
     * characters.
     */
    description: string;
    /**
     * The UTC timestamp in RFC 3339 format, which indicates when the broadcaster ended the goal.
     */
    ended_at: string;
    /**
     * An ID that identifies this event.
     */
    id: string;
    /**
     * A Boolean value that indicates whether the broadcaster achieved their goal. Is true if
     * the goal was achieved; otherwise, false.
     */
    is_achieved: boolean;
    /**
     * The UTC timestamp in RFC 3339 format, which indicates when the broadcaster created the
     * goal.
     */
    started_at: string;
    /**
     * The goal's target value. For example, if the broadcaster has 200 followers before
     * creating the goal, and their goal is to double that number, this field is set to 400.
     */
    target_amount: number;
    /**
     * The type of goal. Can be follow, subscription, subscription_count, new_subscription, or
     * new_subscription_count
     */
    type: string;
    [property: string]: any;
}

/**
 * A Hype Train begins on the specified channel.
 */
export interface ChannelHypeTrainBegin {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The time when the Hype Train expires. The expiration is extended when the Hype Train
     * reaches a new level.
     */
    expires_at: string;
    /**
     * The number of points required to reach the next level.
     */
    goal: number;
    /**
     * The Hype Train ID.
     */
    id: string;
    /**
     * The most recent contribution.
     */
    last_contribution: ChannelHypeTrainBeginLastContribution;
    /**
     * The number of points contributed to the Hype Train at the current level.
     */
    progress: number;
    /**
     * The time when the Hype Train started.
     */
    started_at: string;
    /**
     * The contributors with the most points contributed.
     */
    top_contributions: ChannelHypeTrainBeginTopContributions;
    /**
     * Total points contributed to the Hype Train.
     */
    total: number;
    [property: string]: any;
}

/**
 * The most recent contribution.
 */
export interface ChannelHypeTrainBeginLastContribution {
    /**
     * The total contributed.
     */
    total: number;
    /**
     * Type of contribution. Valid values includebits,subscription.
     */
    type: string;
    /**
     * The ID of the user.
     */
    user_id: string;
    /**
     * The login of the user.
     */
    user_login: string;
    /**
     * The display name of the user.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * The contributors with the most points contributed.
 */
export interface ChannelHypeTrainBeginTopContributions {
    /**
     * The total contributed.
     */
    total: number;
    /**
     * Type of contribution. Valid values includebits,subscription.
     */
    type: string;
    /**
     * The ID of the user.
     */
    user_id: string;
    /**
     * The login of the user.
     */
    user_login: string;
    /**
     * The display name of the user.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A Hype Train makes progress on the specified channel.
 */
export interface ChannelHypeTrainProgress {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The time when the Hype Train expires. The expiration is extended when the Hype Train
     * reaches a new level.
     */
    expires_at: string;
    /**
     * The number of points required to reach the next level.
     */
    goal: number;
    /**
     * The Hype Train ID.
     */
    id: string;
    /**
     * The most recent contribution.
     */
    last_contribution: ChannelHypeTrainProgressLastContribution;
    /**
     * The current level of the Hype Train.
     */
    level: number;
    /**
     * The number of points contributed to the Hype Train at the current level.
     */
    progress: number;
    /**
     * The time when the Hype Train started.
     */
    started_at: string;
    /**
     * The contributors with the most points contributed.
     */
    top_contributions: ChannelHypeTrainProgressTopContributions;
    /**
     * Total points contributed to the Hype Train.
     */
    total: number;
    [property: string]: any;
}

/**
 * The most recent contribution.
 */
export interface ChannelHypeTrainProgressLastContribution {
    /**
     * The total contributed.
     */
    total: number;
    /**
     * Type of contribution. Valid values includebits,subscription.
     */
    type: string;
    /**
     * The ID of the user.
     */
    user_id: string;
    /**
     * The login of the user.
     */
    user_login: string;
    /**
     * The display name of the user.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * The contributors with the most points contributed.
 */
export interface ChannelHypeTrainProgressTopContributions {
    /**
     * The total contributed.
     */
    total: number;
    /**
     * Type of contribution. Valid values includebits,subscription.
     */
    type: string;
    /**
     * The ID of the user.
     */
    user_id: string;
    /**
     * The login of the user.
     */
    user_login: string;
    /**
     * The display name of the user.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * A Hype Train ends on the specified channel.
 */
export interface ChannelHypeTrainEnd {
    /**
     * The requested broadcaster ID.
     */
    broadcaster_user_id: string;
    /**
     * The requested broadcaster login.
     */
    broadcaster_user_login: string;
    /**
     * The requested broadcaster display name.
     */
    broadcaster_user_name: string;
    /**
     * The time when the Hype Train cooldown ends so that the next Hype Train can start.
     */
    cooldown_ends_at: string;
    /**
     * The time when the Hype Train ended.
     */
    ended_at: string;
    /**
     * The Hype Train ID.
     */
    id: string;
    /**
     * The current level of the Hype Train.
     */
    level: number;
    /**
     * The time when the Hype Train started.
     */
    started_at: string;
    /**
     * The contributors with the most points contributed.
     */
    top_contributions: ChannelHypeTrainEndTopContributions;
    /**
     * Total points contributed to the Hype Train.
     */
    total: number;
    [property: string]: any;
}

/**
 * The contributors with the most points contributed.
 */
export interface ChannelHypeTrainEndTopContributions {
    /**
     * The total contributed.
     */
    total: number;
    /**
     * Type of contribution. Valid values includebits,subscription.
     */
    type: string;
    /**
     * The ID of the user.
     */
    user_id: string;
    /**
     * The login of the user.
     */
    user_login: string;
    /**
     * The display name of the user.
     */
    user_name: string;
    [property: string]: any;
}

/**
 * Get notified when the broadcaster activates Shield Mode.
 */
export interface ChannelShieldModeBegin {
    /**
     * The broadcasters user id.
     */
    broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    broadcaster_user_name: string;
    /**
     * An ID that identifies the moderator that updated the Shield Mode's status. If the
     * broadcaster updated the status, this ID will be the same as broadcaster_user_id.
     */
    moderator_user_id: string;
    /**
     * The moderator's user login.
     */
    moderator_user_login: string;
    /**
     * The moderator's user display name.
     */
    moderator_user_name: string;
    /**
     * The UTC timestamp (in RFC3339 format) of when the moderator activated Shield Mode
     */
    started_at: string;
    [property: string]: any;
}

/**
 * Get notified when the broadcaster deactivates Shield Mode.
 */
export interface ChannelShieldModeEnd {
    /**
     * The broadcasters user id.
     */
    broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    broadcaster_user_name: string;
    /**
     * The UTC timestamp (in RFC3339 format) of when the moderator deactivated Shield Mode
     */
    ended_at: string;
    /**
     * An ID that identifies the moderator that updated the Shield Mode's status. If the
     * broadcaster updated the status, this ID will be the same as broadcaster_user_id.
     */
    moderator_user_id: string;
    /**
     * The moderator's user login.
     */
    moderator_user_login: string;
    /**
     * The moderator's user display name.
     */
    moderator_user_name: string;
    [property: string]: any;
}

/**
 * Get notified when the specified broadcaster sends a Shoutout.
 */
export interface ChannelShoutoutCreate {
    /**
     * An ID that identifies the broadcaster that sent the Shoutout.
     */
    broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    broadcaster_user_name: string;
    /**
     * The UTC timestamp (in RFC3339 format) of when the broadcaster may send a Shoutout to a
     * different broadcaster.
     */
    cooldown_ends_at: string;
    /**
     * An ID that identifies the moderator that sent the Shoutout. If the broadcaster sent the
     * Shoutout, this ID is the same as the ID in broadcaster_user_id.
     */
    moderator_user_id: string;
    /**
     * The moderator's user login.
     */
    moderator_user_login: string;
    /**
     * The moderator's user display name.
     */
    moderator_user_name: string;
    /**
     * The UTC timestamp (in RFC3339 format) of when the moderator sent the Shoutout.
     */
    started_at: string;
    /**
     * The UTC timestamp (in RFC3339 format) of when the broadcaster may send another Shoutout
     * to the broadcaster in to_broadcaster_user_id.
     */
    target_cooldown_ends_at: string;
    /**
     * An ID that identifies the broadcaster that received the Shoutout.
     */
    to_broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    to_broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    to_broadcaster_user_name: string;
    /**
     * The number of users that were watching the broadcaster's stream at the time of the
     * Shoutout.
     */
    viewer_count: number;
    [property: string]: any;
}

/**
 * Get notified when the specified broadcaster receives a Shoutout.
 */
export interface ChannelShoutoutReceive {
    /**
     * An ID that identifies the broadcaster that received the Shoutout.
     */
    broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    broadcaster_user_name: string;
    /**
     * An ID that identifies the broadcaster that sent the Shoutout.
     */
    from_broadcaster_user_id: string;
    /**
     * The broadcasters user login.
     */
    from_broadcaster_user_login: string;
    /**
     * The broadcasters user display name.
     */
    from_broadcaster_user_name: string;
    /**
     * The UTC timestamp (in RFC3339 format) of when the moderator sent the Shoutout.
     */
    started_at: string;
    /**
     * The number of users that were watching the broadcaster's stream at the time of the
     * Shoutout.
     */
    viewer_count: number;
    [property: string]: any;
}

export type EventTypeMap = {
"channel-ban": ChannelBan,
"channel-channel_points_custom_reward-add": ChannelChannelPointsCustomRewardAdd,
"channel-channel_points_custom_reward-remove": ChannelChannelPointsCustomRewardRemove,
"channel-channel_points_custom_reward-update": ChannelChannelPointsCustomRewardUpdate,
"channel-channel_points_custom_reward_redemption-add": ChannelChannelPointsCustomRewardRedemptionAdd,
"channel-channel_points_custom_reward_redemption-update": ChannelChannelPointsCustomRewardRedemptionUpdate,
"channel-charity_campaign-donate": ChannelCharityCampaignDonate,
"channel-charity_campaign-progress": ChannelCharityCampaignProgress,
"channel-charity_campaign-start": ChannelCharityCampaignStart,
"channel-charity_campaign-stop": ChannelCharityCampaignStop,
"channel-cheer": ChannelCheer,
"channel-follow": ChannelFollow,
"channel-goal-begin": ChannelGoalBegin,
"channel-goal-end": ChannelGoalEnd,
"channel-goal-progress": ChannelGoalProgress,
"channel-hype_train-begin": ChannelHypeTrainBegin,
"channel-hype_train-end": ChannelHypeTrainEnd,
"channel-hype_train-progress": ChannelHypeTrainProgress,
"channel-moderator-add": ChannelModeratorAdd,
"channel-moderator-remove": ChannelModeratorRemove,
"channel-poll-begin": ChannelPollBegin,
"channel-poll-end": ChannelPollEnd,
"channel-poll-progress": ChannelPollProgress,
"channel-prediction-begin": ChannelPredictionBegin,
"channel-prediction-end": ChannelPredictionEnd,
"channel-prediction-lock": ChannelPredictionLock,
"channel-prediction-progress": ChannelPredictionProgress,
"channel-raid": ChannelRaid,
"channel-shield_mode-begin": ChannelShieldModeBegin,
"channel-shield_mode-end": ChannelShieldModeEnd,
"channel-shoutout-create": ChannelShoutoutCreate,
"channel-shoutout-receive": ChannelShoutoutReceive,
"channel-subscribe": ChannelSubscribe,
"channel-subscription-end": ChannelSubscriptionEnd,
"channel-subscription-gift": ChannelSubscriptionGift,
"channel-subscription-message": ChannelSubscriptionMessage,
"channel-unban": ChannelUnban,
"channel-update": ChannelUpdate,
};
