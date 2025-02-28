from flask import Flask, jsonify


class ResponseHandler:
    def handle(self, error):
        raise NotImplementedError(
            "This method should be overridden in subclasses")


class bankResponseHandler(ResponseHandler):
    def handle(self, action):
        if action == "missing_fields":
            return {"message": "Missing required fields for the charity.", "status": "error"}
        if action == "invalid_input":
            return {"message": "Invalid input. Please provide a valid charity.", "status": "error"}
        if action == "exists":
            return {"message": "Charity with the same name already exists.", "status": "error"}
        if action == "id_exists":
            return {"message": "Charity with the same ID already exists.", "status": "error"}
        if action == "id_required":
            return {"message": "Charity ID is required.", "status": "error"}
        if action == "not_found":
            return {"message": "Charity not found.", "status": "error"}
        if action == "already_following_charity":
            return {"message": "User is already following this charity.", "status": "error"}
        return {"message": f"User has {action} a charity successfully.", "status": "success"}

class PasswordResponseHandler(ResponseHandler):
    def handle(self, action):
        messages = {
            "email_missing": "Email is required to reset the password.",
            "user_not_found": "No user found with the provided email address.",
            "reset_invalid_data": "Invalid data provided for password reset.",
            "reset_invalid_password": "Invalid password. It must include at least 1 letter, 1 number, and be at least 7 characters long.",
            "reset_token_expired": "The password reset token has expired.",
            "reset_token_invalid": "The password reset token is invalid.",
            "password_reset_success": "Password has been reset successfully.",
            "change_invalid_data": "Invalid data provided for changing the password.",
            "password_incorrect": "The current password is incorrect.",
            "password_change_success": "Password has been changed successfully."
        }
        status = "success" if "success" in action else "error"
        return {"message": messages.get(action, "Unknown password error."), "status": status}



class fundsWithdrawalHandler(ResponseHandler):
    def handle(self, drawn):
        if drawn == "funds_drawn":
            return {"message": "You have successfully withdrawn funds.", "status": "success"}
        return {"message": "Insufficient funds to withdraw", "status": "error"}


class fundsDepositHandler(ResponseHandler):
    def handle(self, result):
        messages = {
            "success": "Deposit successful.",
            "invalid": "Invalid credentials. Please try again.",
            "server_issue": "Server issue. Please try again later."
        }
        return {"message": messages.get(result, "Unknown login error."), "status": result}


class SignupResponseHandler(ResponseHandler):
    def handle(self, result):
        messages = {
            "success": "Sign-up successful.",
            "invalid_email": "Invalid email address.",
            "invalid_password": "Invalid password. Password must include at least 1 capital case, 1 small case, 1 number, and be at least 7 characters long."
        }
        return {"message": messages.get(result, "Unknown sign-up error."), "status": result}


class SearchResponseHandler(ResponseHandler):
    def handle(self, result):
        if result == "success": 
            return {"message": "Search completed successfully.", "status": "success"}
        elif result == "invalid_search":
            return {"message": "Invalid search input. Avoid using special characters.", "status": "error"}
        return {"message": "Unknown search error.", "status": "error"}


class AdminArticleResponseHandler(ResponseHandler):
    def handle(self, action):
        return {"message": f"Admin has performed {action} on an Article.", "status": "success"}


class AdminUserResponseHandler(ResponseHandler):
    def handle(self, action):
        return jsonify({"message": f"Admin has performed {action} on a user.", "status": "success"})


class UserResponseHandler(ResponseHandler):
    def handle(self, found):
        if found == "user_id_required":
            return {"message": "User ID is required.", "status": "error"}
        if found == "user_found":
            return {"message": "User found successfully.", "status": "success"}
        if found == "user_already_registered":
            return {"message": "User is already registered.", "status": "error"}
        if found == "user_not_registered":
            return {"message": "User is not registered.", "status": "error"}
        return {"message": "User not found.", "status": "error"}



class ErrorProcessor:
    def __init__(self):
        self.error_map = {
            "charity_follow":            lambda:  bankResponseHandler         ().handle("followed"),
            "charity_unfollow":          lambda:  bankResponseHandler         ().handle("unfollowed"),
            "charity_register":          lambda:  bankResponseHandler         ().handle("registered"),
            "charity_unregister":        lambda:  bankResponseHandler         ().handle("unregistered"),
            "charity_invalid_input":     lambda:  bankResponseHandler         ().handle("invalid_input"),
            "charity_missing_fields":    lambda:  bankResponseHandler         ().handle("missing_fields"),
            "charity_exists":            lambda name:  bankResponseHandler    ().handle("exists"),
            "charity_id_exists":         lambda id:  bankResponseHandler      ().handle("id_exists"),
            "charity_id_required":       lambda:  bankResponseHandler         ().handle("id_required"),
            "charity_not_found":         lambda:  bankResponseHandler         ().handle("not_found"),
            "login_success":             lambda:  LoginResponseHandler        ().handle("success"),
            "login_invalid":             lambda:  LoginResponseHandler        ().handle("invalid"),
            "login_server_issue":        lambda:  LoginResponseHandler        ().handle("server_issue"),
            "signup_success":            lambda:  SignupResponseHandler       ().handle("success"),
            "signup_invalid_email":      lambda:  SignupResponseHandler       ().handle("invalid_email"),
            "signup_invalid_password":   lambda:  SignupResponseHandler       ().handle("invalid_password"),
            "search_success":            lambda:  SearchResponseHandler       ().handle("success"),
            "search_invalid":            lambda:  SearchResponseHandler       ().handle("invalid_search"),
            "admin_user_create":     lambda:  AdminUserResponseHandler().handle("create"),
            # "admin_campaign_read":       lambda:  AdminCampaignResponseHandler().handle("read"),
            # "admin_campaign_update":     lambda:  AdminCampaignResponseHandler().handle("update"),
            # "admin_campaign_delete":     lambda:  AdminCampaignResponseHandler().handle("delete"),
            # "admin_user_update":         lambda:  AdminUserResponseHandler    ().handle("update (points)"),
            # "admin_user_delete":         lambda:  AdminUserResponseHandler    ().handle("delete (bad behaviour)"),        
            # we should probably make an admin dashobard to add new articles from and manage users..
            "user_found":                lambda:  UserResponseHandler         ().handle("user_found"),
            "user_not_found":            lambda:  UserResponseHandler         ().handle("user_not_found"),
            "user_id_required":          lambda:  UserResponseHandler         ().handle("user_id_required"),
            "user_already_registered":   lambda:  UserResponseHandler         ().handle("user_already_registered"),
            "user_not_registered":       lambda:  UserResponseHandler         ().handle("user_not_registered"),
            "email_missing":             lambda:  PasswordResponseHandler     ().handle("email_missing"),
            "reset_invalid_data":        lambda:  PasswordResponseHandler     ().handle("reset_invalid_data"),
            "reset_invalid_password":    lambda:  PasswordResponseHandler     ().handle("reset_invalid_password"),
            "reset_token_expired":       lambda:  PasswordResponseHandler     ().handle("reset_token_expired"),
            "reset_token_invalid":       lambda:  PasswordResponseHandler     ().handle("reset_token_invalid"),
            "password_reset_success":    lambda:  PasswordResponseHandler     ().handle("password_reset_success"),
            "change_invalid_data":       lambda:  PasswordResponseHandler     ().handle("change_invalid_data"),
            "password_incorrect":        lambda:  PasswordResponseHandler     ().handle("password_incorrect"),
            "password_change_success":   lambda:  PasswordResponseHandler     ().handle("password_change_success"),
            }

    def process_error(self, error, name=None, id=None):
        if id:
            return self.error_map.get(error)(id)
        if name:
            return self.error_map.get(error)(name)
        return self.error_map.get(error, lambda: jsonify({"message": "Unknown error.", "status": "error"}))()
