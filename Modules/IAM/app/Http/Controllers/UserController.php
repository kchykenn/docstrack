<?php

namespace Modules\IAM\Http\Controllers;

use Modules\IAM\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Modules\Core\Http\Controllers\CoreController as Controller;
use Modules\IAM\Models\Role;
use Modules\IAM\Models\User;
use Modules\IAM\Http\Requests\UserFormRequest;
use Illuminate\Http\RedirectResponse;
use Modules\IAM\Http\Resources\RoleResource;

class UserController extends Controller
{
    protected UserService $userService;
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct(UserService $userService)
    {
        $this->authorizeResource(User::class, 'user');
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return Inertia
     */
    public function index(Request $request)
    {
        $users = $this->userService->index();
        $roles = Role::all();

        /* return Inertia::render('IAM::User/index', [
            'users' => $users,
            'roles' => RoleResource::collection($roles),
        ]); */

        RoleResource::withoutWrapping();

        return inertia('IAM::User/index', [
            'users' => $users,
            'roles' => RoleResource::collection($roles),
        ]);
    }


    public function create()
    {
        return Inertia::render('IAM::User/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'prefix'        => 'nullable|string|max:10',
            'first_name'    => 'required|string|max:255',
            'middle_name'   => 'nullable|string|max:255',
            'last_name'     => 'required|string|max:255',
            'name_extension' => 'nullable|string|max:10',
            'sex'           => 'required|string|max:10',
            'civil_status'  => 'required|string|max:50',
            'birthdate'     => 'required|string|max:50',
            'mobile_number' => 'required|string|max:20',
            'username'      => 'required|string|max:255|unique:users,username',
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|string|min:8',
        ]);

        User::create([
            'prefix'        => $request->prefix,
            'first_name'    => $request->first_name,
            'middle_name'   => $request->middle_name,
            'last_name'     => $request->last_name,
            'name_extension' => $request->name_extension,
            'sex'           => $request->sex,
            'civil_status'  => $request->civil_status,
            'birthdate'     => $request->birthdate,
            'mobile_number' => $request->mobile_number,
            'username'      => $request->username,
            'email'         => $request->email,
            'password'      => bcrypt($request->password),
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully!');
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  User  $user
     * @return Inertia
     */
    public function edit(User $user)
    {
        return Inertia::render('User::User/Edit', [
            'user' => $user->load('roles:id,name'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UserFormRequest  $request
     * @param  User  $user
     * @return Redirect
     */
    public function update(UserFormRequest $request, User $user): RedirectResponse
    {
        if (isset($request->photo)) {
            $user->updateProfilePhoto($request->photo);
        }

        $user->update($request->validated());

        /* if(isset($request->roles)) {
            // $roles = Role::findMany($request->roles);
            $roleIds = Arr::pluck($request->roles, 'id');
            $user->syncRoles($roleIds);
        } */

        // return redirect()->back();
        return redirect(route('admin.users.index'))->with('success', 'User updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User  $user
     * @return Redirect
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect(route('admin.users.index'))->with('success', 'User deleted.');
    }

    /**
     * Restore specified resource in storage.
     *
     * @param  User  $user
     * @return Redirect
     */
    public function restore(User $user): RedirectResponse
    {
        $user->restore();

        return redirect(route('admin.users.index'))->with('success', 'User restored.');
    }

    /**
     * Delete user profile photo
     *
     * @param  User  $user
     * @return Redirect
     */
    public function deletePhoto(User $user): RedirectResponse
    {
        $user->deleteProfilePhoto();

        return back(303)->with('status', 'profile-photo-deleted');
    }
}
